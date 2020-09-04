<?php

namespace Akvo\Commands;

use GuzzleHttp\Client;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Akvo\Api\Auth;
use Akvo\Api\FlowApi;
use Akvo\Models\Survey;

class AkvoFlowApi extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'akvo:api {--instance="Akvo Flow Instance (e.g development)"}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch Akvo Flow Data';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $environments = [
            'AKVOFLOW_AUTH_URL',
            'AKVOFLOW_CLIENT_ID',
            'AKVOFLOW_API_URL',
            'AKVOFLOW_INSTANCE',
            'AKVOFLOW_PASSWORD',
            'AKVOFLOW_USERNAME',
        ];
        $this->info("Checking environment");
        foreach($environments as $environ) {
            $env = $this->checkEnv($environ);
            if (!$env) {
                $this->info("Aborting");
                return;
            }
        }
        $this->info("All environment variable is set");
        $auth = new Auth();
        $token = $auth->getToken();
        if (!$token) {
            $this->error("Invalid Access");
            return;
        }
        $api = new FlowApi($auth);
        $this->interactive($api, "folders", true);
    }

    /**
     * Show the console interactive mode.
     *
     * @return function
     */
    public function interactive($api, $endpoint, $get)
    {
        $folders = $get ? $api->get($endpoint) : $api->fetch($endpoint);
        $options = collect();
        if (isset($folders['folders'])){
            foreach($folders['folders'] as $folder) {
                $options->push('Folders -> '.$folder['name'].' | '.$folder['id']);
            }
        }
        if (Str::contains($endpoint, '/folders?parent_id=')) {
            $endpoint = Str::replaceLast('folders?parent_id=','surveys?folder_id=', $endpoint);
            $surveys = $api->fetch($endpoint);
            var_dump($surveys);
            if (isset($surveys['surveys'])){
                foreach($surveys['surveys'] as $survey) {
                    $options->push('Surveys -> '.$survey['name'].' | '.$survey['id']);
                }
            }
        }
        if (count($options) > 0) {
            $selection = $this->choice("Please select folder or survey", $options->toArray());
            $id = Str::afterLast($selection, '| ');
            $type= Str::beforeLast($selection, ' ->');
            $endpoint = env('AKVOFLOW_API_URL').'/';
            $endpoint .= env('AKVOFLOW_INSTANCE');
            if ($type === "Folders") {
                $endpoint .= '/folders?parent_id='.$id;
                return $this->interactive($api, $endpoint, false);
            }
            if ($type === "Surveys") {
                $endpoint .= '/surveys/'.$id;
                $data = $api->fetch($endpoint);
                $survey = \Akvo\Models\Survey::create([
                    'id' => (int) $data['id'],
                    'name' => $data['name'],
                    'registration_id' => (int) $data['registrationFormId']
                ]);
                foreach($data['forms'] as $form) {
                    $forms[] = new \Akvo\Models\Form([
                        'id' => (int) $form['id'],
                        'name' => $form['name']
                    ]);
                }
                $survey->forms()->saveMany($forms);
                $continue = $this->confirm("Config added, do you want to continue?");
                if ($continue) {
                    return $this->handle();
                }
            }
        }
        return;
    }

    private function checkEnv($item)
    {
        $environment = env($item);
        if ($environment === NULL) {
            $this->error($item." is not defined");
            return false;
        }
        return true;

    }
}


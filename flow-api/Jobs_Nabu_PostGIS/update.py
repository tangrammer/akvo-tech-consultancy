import requests as r
import pg
import time
import sys
import os

base_url = 'https://nabu.akvolumen.org'
dataset_api_url = base_url + '/api/datasets/{}'
update_api_url = dataset_api_url + '/update'
job_status_url = base_url + '/api/job_executions/dataset/{}'
max_attempts = 120
wait_time = 5

token_url = 'https://akvofoundation.eu.auth0.com/oauth/token'

token_data = {
    'client_id': os.environ['CLIENT_ID'],
    'client_secret': os.environ['CLIENT_SECRET'],
    'username': os.environ['AUTH0_USER'],
    'password': os.environ['AUTH0_PWD'],
    'grant_type': 'password',
    'scope': 'openid email'
}

table_dataset = {
    'Carbon Monitoring': '5dd7c3f3-0903-45b1-87af-edff38b7b9dd',
    'Biodiversity Monitoring - Community': '5dd7c4a8-6a97-4992-800a-33340cf73432',
    'Biodiversity Monitoring - Rangers Final - Baseline': '5dd7c51b-9dd2-494e-8a15-af09d7079cef',
    'Forest Disturbance Monitoring - Rangers Final - Baseline': '5dd7c69a-e27d-433c-abe6-8167884745dc',
}


def get_token():
    response = r.post(token_url, token_data)
    if response.ok:
        return response.json()['id_token']
    raise RuntimeError('Unable to get access token: HTTP {} - {}'.format(response.status_code, response.text))


def headers(token):
    return {
        'Authorization': 'Bearer ' + token,
        'Host': 'nabu.akvolumen.org',
        'Origin': 'https://nabu.akvolumen.org',
        'Content-Type': 'application/json',
    }


def wait_for_update(token, job_id):
    for i in range(max_attempts):
        url = job_status_url.format(job_id)
        update_response = r.get(url, headers=headers(token))
        if update_response.ok and update_response.json()['status'] == 'OK':
            print(' - done')
            return True
        print('#', end='')
        time.sleep(wait_time)
    return False


def update_dataset(token, dataset_id):
    print('Updating dataset {}'.format(dataset_id))
    url = update_api_url.format(dataset_id)
    job = r.post(url, headers=headers(token))

    if not job.ok:
        sys.stderr.write('Error updating dataset {} - HTTP {} - '.format(dataset_id, job.status_code, job.text))
        return False

    job_id = job.json()['updateId']

    if not wait_for_update(token, job_id):
        sys.stderr.write('Error updated dataset {}, max attempts reached'.format(dataset_id))
        return False

    return True


def get_dataset(token, dataset_id):
    print('Getting dataset data {}'.format(dataset_id))

    url = dataset_api_url.format(dataset_id)
    data = r.get(url, headers=headers(token))

    if not data.ok:
        sys.stderr.write('Error obtaining dataset {} - HTTP {} - '.format(dataset_id, data.status_code, data.text))
        return None

    return data.json()


def update_tables(dataset_name, dataset):
    prefix = int(time.time())
    table_name = '{}_{}'.format(prefix, dataset_name)
    view_name = dataset_name
    cols = dataset['columns']
    rows = dataset['rows']

    print('Creating import table')
    pg.create_table('import', table_name, cols)

    print('Inserting data')
    pg.insert_data('import', table_name, cols, rows)

    print('Recreating view')
    pg.create_view(view_name, table_name)


for d in table_dataset:
    print('Processing: ' + d)
    dataset_id = table_dataset[d]
    token = get_token()
    if update_dataset(token, dataset_id):
        dataset_data = get_dataset(token, dataset_id)
        if dataset_data is not None:
            update_tables(d, dataset_data)

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DataSourceController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/data-source', [DataSourceController::class, 'index']);
Route::get('/data-source/{id}', [DataSourceController::class, 'view']);

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

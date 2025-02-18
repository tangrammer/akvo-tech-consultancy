<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="{{route('landing')}}"><img src="{{asset('images/logo/solomon-island-logo.png')}}" height="25"></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        Menu
      </button>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item {{ Request::is('/') ? "active" : "" }}">
                <a class="nav-link" href="{{route('landing')}}">Home</a>
            </li>
            <li class="nav-item {{ Request::is('database') ? "active" : "" }}">
                <a class="nav-link" href="{{route('database')}}">Database</a>
            </li>
            <li class="nav-item {{ Request::is('visualization') ? "active" : "" }}">
                <a class="nav-link" href="{{route('visualization')}}">Visualization</a>
            </li>
            <li class="nav-item {{ Request::is('docs') ? "active" : "" }}">
                <a class="nav-link" href="{{route('docs')}}">Documentation</a>
            </li>
            @if ($user = Auth::user())
            <li class="nav-item">
                <a class="nav-link" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();"><i class="fa fa-sign-out"></i>&nbsp;Logout</a>
            </li>
            @endif
        </ul>
        @if ($user = Auth::user())
        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            @csrf
        </form>
        @endif
		<div class="form-inline my-2 my-lg-0">
				<form onsubmit="focusTo()" id="stack_search">
					<a href="#" id="change-cluster" class="mp-btn btn btn-light my-2 my-sm-0" data-cluster="yes"><i class="fa fa-pie-chart"></i></a>
                    @if ($user = Auth::user())
					<a href="#" onclick="downloadData()" class="mp-btn btn btn-light my-2 my-sm-0"><i class="fa fa-download"></i></a>
                    @else
					<a href="#" onclick="showSecurityForm()" class="mp-btn btn btn-light my-2 my-sm-0"><i class="fa fa-download"></i></a>
                    @endif
					<a href="#" onclick="focusNormal()" class="mp-btn btn btn-light my-2 my-sm-0"><i class="fa fa-expand"></i></a>
					<a href="#" onclick="maps.zoomOut()" class="mp-btn btn btn-light my-2 my-sm-0"><i class="fa fa-search-minus"></i></a>
					<a href="#" onclick="maps.zoomIn()" class="mp-btn btn btn-light my-2 my-sm-0"><i class="fa fa-search-plus"></i></a>
					<input id="find" onkeydown="jqUI()" type="text" placeholder="Search School" class="form-control mr-sm-2">
					<input id="zoom_find" type="hidden">
					<input type="submit" id="find_submit" style="position: absolute; left: -9999px"/>
					<a href="#" onclick="focusTo()" class="btn btn-primary my-2 my-sm-0"><i class="fa fa-search"></i></a>
				</form>
        </div>
    </div>
</nav>

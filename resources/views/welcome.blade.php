<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
    <head>
        <title>BIBLI</title>

        <link href="/css/plugins.css" rel="stylesheet" />
        <link href="/css/app.css" rel="stylesheet" />
    </head>
    <body>
        <div class="app" id="app">
            @include('partials.PageNavbar')

            <main class="container">
                <!--[if lt IE 8]>
                <info-box
                        v-if=" ! alertHasBeenDismissed('oldBrowserWarning')"
                        v-on:click="dismissAlert('oldBrowserWarning')"
                        type="warning"
                ><p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p></info-box>
                <![endif]-->


                <!-- Nav tabs -->
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#editor" role="tab"><i class="fa fa-edit"></i> Editor</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#bib" role="tab">Bib.</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#references" role="tab"><i class="fa fa-book"></i> References</a>
                    </li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                    <div class="tab-pane" id="editor" role="tabpanel">
                        @include('partials.editor')
                    </div>
                    <div class="tab-pane" id="bib" role="tabpanel">
                        @include('partials.bibliography')
                    </div>
                    <div class="tab-pane active" id="references" role="tabpanel">
                        @include('partials.references')
                    </div>
                </div>
            </main>

            @include('partials.pageFooter')
         </div>
        <script src="/js/plugins.js"></script>
        <script src="/js/main.js"></script>
    </body>
</html>

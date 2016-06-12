<section>
    <header>
        <h1>References</h1>
    </header>

    <info-box
            v-if=" ! alertHasBeenDismissed('sectionForReferences')"
            v-on:click="dismissAlert('sectionForReferences')"
            type="error"
    >This section is for your references. Once you have a list of references you can then simply select them to put them in your Bibli.</info-box>

    <p>You can add as many references as you like and this will make including them in your bibli. a doddle.</p>

    <form v-on:submit.prevent="getTitle" method="GET">
        {{ csrf_field() }}
        <fieldset class="form-group">

            <div class="clearfix container">
                <div class="row">
                    <div v-bind:class="['form-group', 'col-sm-9', pageTitleRetrieved ? 'has-success' : '']">
                        <label class="sr-only" for="onlyForUrl"><abbr title="Uniform Resource Locator">URL</abbr> (web address):</label>
                        <div class="input-group">
                            <input
                                    autocomplete="off"
                                    type="text"
                                    class="form-control"
                                    id="onlyForUrl"
                                    placeholder="google.com"
                                    v-model="currentUrl"
                            >
                            <div class="input-group-addon">
                                <i class="fa fa-globe" v-show=" ! pageTitleRetrieved"></i>
                                <i class="fa fa-check-circle" v-show="pageTitleRetrieved"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <button type="submit" class="btn btn-primary">Add this reference</button>
                    </div>
                </div>
            </div>

        </fieldset>
    </form>

    <div class="form-group col-sm-9" v-show="urlSubmitted" id="newPageTitle">
        <p v-show=" ! useDefaultPageTitle" id="addOwnPageTitleLabel" class="animated" transition="useOwnUrlP">
            Please enter a page title you would like to appear in your Bibli. whenever you reference this web page.
        </p>

        <label class="sr-only" for="pageTitle">Page title:</label>
        <div class="input-group">
            <div class="input-group-addon">
                <span v-if=" ! pageTitleRetrieved"><i class="fa fa-spinner fa-spin"></i></span>
                <span v-else><i class="fa fa-check-circle-o" style="color: darkgreen;"></i></span>
            </div>
            <input
                    type="text"
                    class="form-control"
                    id="pageTitle"
                    placeholder="Retrieving Page Title..."
                    v-model="pageTitle"
                    disabled="@{{ useDefaultPageTitle ? true : false }}"

            >
        </div>

        <div style="margin-top: 1rem" v-show="pageTitleRetrieved">
            <p v-show="useDefaultPageTitle">
                Do you want to use the default <strong>title</strong> for this page for any entries from this reference in your Bibli.?
            </p>
            <p class="row">
                <span class="col-sm-3 col-sm-offset-2">
                    <button type="button" class="btn btn-primary" @click="addPage">
                    @{{ useDefaultPageTitle ? 'Yes (recommended)' : 'Add Webpage' }}
                    </button>
                </span>
                <span class="col-sm-3 col-sm-offset-2">
                    <button type="button" class="btn btn-warning" @click="addOwnPageTitle" v-if="useDefaultPageTitle">No</button>
                    <button type="button" class="btn btn-danger" @click="cancelNewPageTitle" v-else>Cancel</button>
                </span>
            </p>
        </div>

    </div>

    <table class="table table-bordered">
        <thead class="thead-default">
        <tr>
            <td>Type</td>
            <th>Title</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="ref in references">
            <td>@{{ ref.type }}</td>
            <td><a href="@{{ ref.url }}" title="Link to @{{ ref.name }} on the internet">@{{ ref.name }}</a></td>
            <td>
                <i class="fa fa-edit pointer"></i> |
                <i class="fa fa-download pointer"></i> |
                <i class="fa fa-info-circle pointer"></i> |
                <i class="fa fa-close pointer" style="color: darkred; margin-left: 0.5rem;" v-on:click="removeReference(ref)"></i>
            </td>
        </tr>
        </tbody>
        <tfoot></tfoot>
    </table>
</section>

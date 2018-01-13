<!-- ======================================================================= -->
<!-- Locations -->

<script type="text/template" id="locations_template">
    <style>
        td, th {
            border: none;
        }
    </style>
    <!-- <table id="location_table" class="ui table nowrap small text" cellspacing="0" width="100%"></table> -->
    <div id="location_list" class="ui list"></div>
    <div id="toggles" style="display:none;">
        <form class="ui form">
            <select id="location_select" class="ui dropdown">
                <option value="all">All</option>
                <% var exclude = ['description','address','url','town','county','name']; console.log(exclude); %>
                <% _.each(location_layers, function(value){ %>
                    <% console.log(exclude.indexOf(value)); %>
                    <% if(exclude.indexOf(value) == -1){ %>
                        <option value="<%= value %>"><%= value %></option>
                    <% } %>
                <% }); %>
            </select>
        </form>
    </div>
</script>

<!-- ======================================================================= -->
<!-- Location List Item -->

<script type="text/template" id="location_list_item_template">
    <div class="item">
        <div class="ui stackable grid">
            <div class="eight wide column">
                <div class="ui list">
                    <div class="item">
                        <div class="header"><%= name %></div>
                        <div class="content">
                            <%= address %>
                        </div>
                    </div>
                </div>
            </div>
            <div class="eight wide column">
                <div class="ui list">
                    <% if(url){ %>
                    <div class="item">
                        <i class="world icon"></i>
                        <!-- <div class="content"> -->
                            <a>Website</a>
                        <!-- </div> -->
                    </div>
                    <% } %>
                    <div class="item">
                        <i class="map signs icon"></i>
                        <!-- <div class="content"> -->
                            <a href="<%= url %>" target="_blank">Directions</a>
                        <!-- </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</script>

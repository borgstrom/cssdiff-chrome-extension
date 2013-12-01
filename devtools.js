chrome.devtools.panels.create(
    'CSS Diff',
    null, // No icon path
    'panel/index.html',
    function(panel) {
        var initial_resources = {},
            modified_resources = {};

        // collect our current resources
        chrome.devtools.inspectedWindow.getResources(function(resources) {
            for (var i = 0, c = resources.length; i < c; i++) {
                if (resources[i].type == 'stylesheet') {
                    // use a self invoking function here to make sure the correct
                    // instance of `resource` is used in the callback
                    (function(resource) {
                        resource.getContent(function(content, encoding) {
                            initial_resources[resource.url] = content;
                        });
                    })(resources[i]);
                }
            }
        });

        // add a listener to track committed changes to resources
        chrome.devtools.inspectedWindow.onResourceContentCommitted.addListener(function(resource, content) {
            modified_resources[resource.url] = content;
        });

        panel.onShown.addListener(function(window) {
            window.updateDiff(initial_resources, modified_resources);
        });
    }
);

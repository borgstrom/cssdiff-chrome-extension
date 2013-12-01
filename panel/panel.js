/*
 * css tracker panel script
 */

function byId(id) {
    return document.getElementById(id);
}

(function(window, document, undefined) {
    var output = byId('output'),
        template_source = byId('output-template').innerHTML;

    // we attach a function to our window object that will be called whenever
    // our panel is shown (see devtools.js)
    window.updateDiff = function(initial_resources, modified_resources) {
        var context = {
                'resources': []
            };

        for (url in modified_resources) {
            context['resources'].push({
                'diff': JsDiff.createPatch(
                    url,
                    initial_resources[url],
                    modified_resources[url]
                )
            });
        }

        output.innerHTML = Mustache.render(template_source, context);
        prettyPrint()
    }

})(window, document);

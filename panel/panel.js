/*
 * css tracker panel script
 */

function byId(id) {
    return document.getElementById(id);
}

(function(window, document, undefined) {
    var output = byId('output'),
        template_source = byId('output-template').innerHTML,
        context_size = 10; // TODO: make this a configuration option

    function build_diff(resource1, resource2) {
        var r1_lines = difflib.stringAsLines(resource1),
            r2_lines = difflib.stringAsLines(resource2),
            matcher = new difflib.SequenceMatcher(r1_lines, r2_lines);

        return diffview.buildView({
            viewType: 1,
            contextSize: context_size,
            opcodes: matcher.get_opcodes(),
            baseTextLines: r1_lines,
            baseTextName: 'Initial',
            newTextLines: r2_lines,
            newTextName: 'Current',
        }).outerHTML;
    }

    // we attach a function to our window object that will be called whenever
    // our panel is shown (see devtools.js)
    window.updateDiff = function(initial_resources, modified_resources) {
        var context = {
                'resources': []
            };

        for (url in modified_resources) {
            context['resources'].push({
                'url': url,
                'diff': build_diff(initial_resources[url], modified_resources[url])
            });
        }

        output.innerHTML = Mustache.render(template_source, context);
    }

})(window, document);

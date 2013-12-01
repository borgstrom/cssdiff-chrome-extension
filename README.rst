cssdiff-chrome-extension
========================
This is a Chrome Devtools Extension that tracks changes you make via the
inspector and provides a convenient "patch" style listing of the changes so
that they can be easily shared.

.. image:: http://i.imgur.com/XoI2vII.png
   :alt: Money Shot

This grew out of our own frustration with how we worked with designers or art
directors. Typically we'll get a screenshot emailed to you highlighting the
changes they want made so that they're layouts are "pixel perfect".

Once these design types are introduced to the inspector they find joy in the
ability to endlessly play & tweak values, but we found that there was still no
good way to convey the changes they made back to us. We started getting email
with screenshots of the inspector highlighting the changes, a little better
than just a marked up screenshot but still a pain to merge the changes back
into the code base.

We investigated all of the live-edit style CSS systems, but they're all so
much overkill for what we need and require lots of complicated setup. They
just wouldn't work for design types.

After discussing the problem around the studio for a couple weeks we figured
that if we could just get a patch style output of the differences emailed to
us, or provided in a ticket, then a developer could easily grok the changes
and manually merge them back into the code base.

And voila. This extension was built.

Installation
------------
* Clone this repository
* Open the Chrome extensions page by typing the following in your address
  bar::

    chrome://extensions

* Ensure Developer Mode is enable (top right)
* Choose ``Load Unpacked Extension``
* Select the directory that was created when you cloned the repository

TODO: Get this in the Chrome web store.

Usage
-----
Once the extension is installed just open and use the devtools window as you
normally would. You'll notice that at the top is a new Tab that says ``CSS
Diff``, when you visit it you'll be given the patch style output of your
changes.

Caveats
-------
This only works with uncompiled/unminified CSS sources because we're actually
running a diff on the raw source in the inspected window. This shouldn't be a
problem since this tool is meant for development purposes, but needed to be
called out.

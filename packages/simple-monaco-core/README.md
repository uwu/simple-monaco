# simple-monaco-core

This is the core package that manages the common tasks such as loading and theming for the
uwunet simple-monaco packages.

[Top level docs](https://github.com/uwu/simple-monaco)

## The monaco loading process

Monaco loading is lazy, and done only on demand.

1. `initMonacoIfNeeded(useNpmMonaco?)` is called.
   If monaco is passed,
   sets that as the instance of the library to use,
   else it loads it from jsDelivr.
   This is done asynchronously and is mutexed, so future calls will await for the same loading.

   This is called the first time a component is mounted on the page, and the prop is exposed via the
   `noCdn` props as mentioned in the main docs.

2. The `monaco` export is set to the instance of monaco.
3. All post-load callbacks set with `registerPostloadCallback(cb)` are ran in order, asynchronously,
   and passed the monaco instance. This is useful for setting default options and the like.
4. The promise returned from the init function resolves, allowing editor components to render.

## Theme loading

You may use any of the themes from `monaco-themes` by name, the names of which are exported
as `namedThemes`.

If your theme is not one of these you can link to the json as a url, and that will work too.

Finally, you can pass it manually with a name and `IStandaloneThemeData` object.

You do this by calling `addThemeIfNeeded`, after which you can use the theme by name in monaco.

If you're using the components, they will call this for you, and you simply pass the theme you want
directly into the `theme` prop, see the main docs for more details.

# dexercism.vim

`dexercism.vim` is the plugin of [Exercism](https://exercism.org/), an online coding platform.

## Installation
Add the following plugins.

```
'vim-denops/denops.vim'
'pyonk/dexercism.vim'
```

## Usage
### download
You can download a code from Exercism by the following command.

```
:Dexercism download [track] [exercise]
```

For example, when you run `:Dexercism download go weather-forecast`, it downloads [this](https://exercism.org/tracks/go/exercises/weather-forecast).

### submit

```
:Dexercism submit [path]
```

When you don't provide the path, the current file of the current buffer is submitted.

## Requirements

This plugin is using [denops.vim](https://github.com/vim-denops/denops.vim).

## TODO
- [x] Download a exercise
- [x] Submit code
- [ ] Refactoring

etc...

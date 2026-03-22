```
____    __    ____  _______ .______       _______   ______     ______ .___________.  ______   .______
\   \  /  \  /   / |   ____||   _  \     |       \ /  __  \   /      ||           | /  __  \  |   _  \
 \   \/    \/   /  |  |__   |  |_)  |    |  .--.  |  |  |  | |  ,----'`---|  |----`|  |  |  | |  |_)  |
  \            /   |   __|  |   _  <     |  |  |  |  |  |  | |  |         |  |     |  |  |  | |      /
   \    /\    /    |  |____ |  |_)  |    |  '--'  |  `--'  | |  `----.    |  |     |  `--'  | |  |\  \----.
    \__/  \__/     |_______||______/     |_______/ \______/   \______|    |__|      \______/  | _| `._____|

```

A CLI that analyzes HTML, CSS, and JavaScript codebases for best practices, performance, and accessibility.

## Requirements

- [Bun](https://bun.com) v1.0 or higher

## Installation

```bash
bun add -g web-doctor-cli
```

## Usage

Run the diagnosis on the current directory:

```bash
bun web-doctor
```

Or point it to a specific directory:

```bash
bun web-doctor ./my-project
```

Web Doctor will scan all .html, .css, and .js files in the given directory, analyze each one, and report any issues found.

## Contributing

Contributions are welcome! Feel free to open a pull request with improvements, new analyzers, or bug fixes.

## Bug Reports

Found a bug? Please open an issue on GitHub Issues describing what happened and how to reproduce it.

## Contributors

<a href="https://github.com/VictorFrancelino/web-doctor-cli/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=VictorFrancelino/web-doctor-cli" />
</a>

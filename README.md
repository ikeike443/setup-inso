# setup-inso
Install [inso](https://insomnia.rest/products/inso) for your GitHub Actions workflow

Add the following to your steps definition:

```
- uses: ikeike443/setup-inso@v1
  with:
    inso-version: 2.22.35
```
    
Sample workflow
```
on:
  push:
    branches:
      - main
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: ikeike443/setup-inso@v1
        with:
          inso-version: 2.22.35
      - run: inso --help
```


## NOTE
For now, inso is re-packaged mannualy and uploaded [here](https://github.com/ikeike443/inso-pkg/releases/tag/2.2.35)

How to build is described in: https://github.com/ikeike443/inso-pkg/blob/main/README.md

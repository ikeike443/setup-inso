const tc = require("@actions/tool-cache");
const core = require("@actions/core");
const semver = require("semver");

async function action() {
  const version = core.getInput("inso-version", { required: true });
  const semverVersion = semver.valid(semver.coerce(version));

  if (!semverVersion) {
    throw new Error(`Invalid version provided: '${version}'`);
  }

  console.log(`Installing inso version ${semverVersion}`);

  let insoDirectory = tc.find("insomnia-inso", semverVersion);
  console.log(`insoDirectory: ${insoDirectory}`)
  if (!insoDirectory) { 
    const versionUrl = `https://github.com/ikeike443/inso-pkg/releases/download/${semverVersion}/insomnia-inso-${semverVersion}.tar.gz`;
    const insoPath = await tc.downloadTool(versionUrl);
    console.log(`insoPath: ${insoPath}`)
    const insoExtractedFolder = await tc.extractTar(
      insoPath,
      `insomnia-inso`
    );
    console.log(`insoExtractedFolder: ${insoExtractedFolder}`)

    insoDirectory = await tc.cacheDir(insoExtractedFolder, "insomnia-inso", semverVersion);
    console.log(`insoDirectory: ${insoDirectory}`)
  }
  console.log(`insoDirectory: ${insoDirectory}`)
  
  core.addPath(insoDirectory);
}

if (require.main === module) {
  action();
}

module.exports = action;
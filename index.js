const tc = require("@actions/tool-cache");
const core = require("@actions/core");
// const semver = require("semver");
// const exec = require('child_process').execSync;
//TODO: PKGしたInsoをダウンロードしてインストールしてみる
async function action() {
  // const version = core.getInput("inso-version", { required: true });
  // const semverVersion = semver.valid(semver.coerce(version));

  // if (!semverVersion) {
    // throw new Error(`Invalid version provided: '${version}'`);
  // }

  // let os = getPlatform(process.platform);
  // console.log(`Installing inso ${semverVersion} on ${os}`)
//   const fullVersion = `${semverVersion}-${os}`;
//   console.log(`Installing decK version ${fullVersion}`);

  // exec(``).toString;

  let insoDirectory = tc.find("insomnia-inso", "latest");
  if (!insoDirectory) {
    const versionUrl = `https://github.com/ikeike443/inso-pkg/releases/download/0.1/insomnia-inso.tar.gz`;
    const insoPath = await tc.downloadTool(versionUrl);

    const insoExtractedFolder = await tc.extractTar(
      insoPath,
      `insmnia-inso`
    );

    insoDirectory = await tc.cacheDir(insoExtractedFolder, "inso", "latest");
  }
  
  core.addPath(insoDirectory);
}

// function getPlatform(platform) {
//   if (platform === "win32") {
//     return "windows";
//   }

//   if (process.platform === "darwin") {
//     return "darwin";
//   }

//   return "linux";
// }

if (require.main === module) {
  action();
}

module.exports = action;
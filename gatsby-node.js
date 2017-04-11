const _ = require("lodash");
const Promise = require("bluebird");
const path = require("path");
const select = require(`unist-util-select`);
const precache = require(`sw-precache`);
const fs = require(`fs-extra`);
const webpackLodashPlugin = require("lodash-webpack-plugin");

exports.createPages = ({ graphql, actionCreators }) => {
  const { upsertPage } = actionCreators;

  return new Promise((resolve, reject) => {
    const pages = [];

    graphql(``)
    .then(result => {
      if (result.errors) {
        console.log(result.errors);
        resolve();
        // reject(result.errors);
      }

      resolve();
    });
  });
};

exports.modifyAST = ({ args }) => {
  const { ast } = args
  const files = select(ast, `File`)

  files.forEach(file => {
    const parsedFilePath = parseFilepath(file.relativePath)
    let slug

    if (file.sourceName === `docs`) {
      if (parsedFilePath.name !== `index` && parsedFilePath.dir !== ``) {
        slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
      } else if (parsedFilePath.dir === ``) {
        slug = `/${parsedFilePath.name}/`
      } else {
        slug = `/${parsedFilePath.dir}/`
      }

      // Generate slugs for package READMEs.
    } else if (
      file.sourceName === `packages` && parsedFilePath.name === `README`
    ) {
      slug = `/docs/packages/${parsedFilePath.dir}/`
      file.children[0].frontmatter = {}
      file.children[0].frontmatter.title = parsedFilePath.dir
      file.children[0].package = true
    }

    // Add to File & child nodes.
    if (file.children[0]) {
      file.children[0].slug = slug
    }
    file.slug = slug
  })

  return files
}

// Add Lodash plugin
exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === `build-javascript`) {
    config.plugin(`Lodash`, webpackLodashPlugin, null);
  }

  return;
};

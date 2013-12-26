build_dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
project_dir=$build_dir/..
cp $project_dir/src/angularjs-webworker-pool.js $project_dir/dist
uglifyjs $project_dir/src/angularjs-webworker-pool.js -o $project_dir/dist/angularjs-webworker-pool.min.js
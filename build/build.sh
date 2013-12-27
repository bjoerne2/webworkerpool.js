build_dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
project_dir=$build_dir/..
cp $project_dir/src/* $project_dir/dist
cat $project_dir/src/webworkerpool-core.js $project_dir/src/webworkerpool-angular.js > $project_dir/dist/webworkerpool-core-angular.js
uglifyjs $project_dir/src/webworkerpool-core.js -o $project_dir/dist/webworkerpool-core.min.js
uglifyjs $project_dir/src/webworkerpool-angular.js -o $project_dir/dist/webworkerpool-angular.min.js
uglifyjs $project_dir/src/webworkerpool-core.js $project_dir/src/webworkerpool-angular.js -o $project_dir/dist/webworkerpool-core-angular.min.js

#!/bin/bash

script_dir=$(dirname "$(realpath "$0")")

cd "${script_dir}/OrganizerGenerator/";

"./run.sh" "octs" "../../src/main/webapp/resources/$1";
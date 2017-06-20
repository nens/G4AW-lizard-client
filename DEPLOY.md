Setup
=====

To deploy to staging, a release must be created and a correct Ansible
configuration must be present.

The default Ansible config is in a Git submodule in deploy/ ; if it isn't there,
clone it with

    git submodule update --init deploy

There are three files that need to be configured, auth.json, hosts and group_vars/all.

Auth.json can be copied from auth.json.example, and the key filled
with a new one created on Github. Make sure to give this 'repo'
rights. This is used by buck-trap to upload the release to Github.

The 'hosts' file contains the various hosts; it's the same file as
used with lizard-client (as this G4AW client is deployed to the same
servers).

group_vars/all contains details specific to this project, and it should contain:

    build_user: buildout

    repo_name: G4AW-lizard-client

    project_path: "/srv/{{ sitename }}"
    deploy_path: "{{ project_path }}/src/G4AW-lizard-client/dist"


Making a release
================

Make sure you are on the master branch and have updated to the latest version.

Run

    npm run build

To build the distribution; fix any errors (and commit the fixes). This
produces an index.html and Javascript file in the dist/ directory.

Now release it with

    npm run release

This figures out a new version number to use (relying on commit
messages...), tags the current commit and uploads the dist/ folder to
Github. If anything went wrong, the tag is still made, the updated
files are still committed and it is pushed to Github. So make sure
that doesn't happen (in particular, have a good auth.json).

Check that the release was created correctly on Github.


Deploying to staging
====================

Deployment is as simple as

    npm run staging-deploy

This asks for a version (which it should print on the first line, so
just use that; it's similar to `0.3.1`, without a leading `v`. Then it
runs the Ansible deploy script to download and install the release to
the staging servers.

# CLI Program Readme

## Introduction

This is a CLI (Command-Line Interface) program written in TypeScript, runs on Deno, leveraging the [Cliffy](https://cliffy.io/) CLI library. For now it provides a convenient way to interact with Git repositories and offers a branch syncing feature.

## Prerequisites

To run this CLI program, you need to have Deno installed on your machine. Deno is a secure JavaScript/TypeScript runtime built on V8. You can find installation instructions for Deno at [https://deno.land](https://deno.land).

## Installation

To install the CLI program, follow these steps:

1. Clone the repository to your local machine: `git clone git@github.com:First-Derivative/dev-tools.git`
2. Navigate to the project directory: `cd dev-tools`
3. Install the cli with the deno task 'isntall': `deno task install`

## Usage

Once the CLI program is installed, you can use it by executing the `dev-tools` command in your terminal.

Command can be changed by updating the `deno.json` file or by manually running `deno install`.

The program supports the following commands:

- `sync <source-branch>`: Synchronizes a Git branch with another branch. It merges the changes from the source branch into the target branch. For example, to sync the `feature-branch` into `main`, run: `dev-tools sync feature-branch`.

## Configuration

The CLI program reads the Git repository information from the directory where the command is executed, so make sure you are in the correct repository before executing any commands.

## Features

### Branch Syncing

The `sync` command allows you to synchronize a source branch with a target branch. This feature merges the changes from the source branch into all other branches in the repo, ensuring that latest changes are replicated.

Planned Updates:

1. Support for list of branches to exclusively sync to instead of syncing all branches found in the repo.
2. configs/flags for different merge type support.
3. flag that specifies whether to push the branch after syncing.

## Issues and Feedback

If you encounter any issues or have suggestions for improvement, please open an issue on the project's GitHub repository: [link-to-repo](https://github.com/First-Derivative/dev-tools).

## Contact

If you have any further questions or need assistance, feel free to contact the maintainer of this project: [ashraff.hatz@gmail.com](mailto:ashraff.hatz@gmail.com).

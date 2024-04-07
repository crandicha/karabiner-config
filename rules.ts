import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, yabai } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
          {
            key_code: "left_shift",
            modifiers: ["left_command", "left_control", "left_option"],
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "caps_lock",
          },
        ],
        type: "basic",
      },
    ],
  },
  ...createHyperSubLayers({
    // b = "B"rowse
    b: {
      g: open("https://github.com"),
      j: open(
        "https://borobudur.atlassian.net/jira/software/c/projects/PRCNG/boards/632?assignee=712020%3A73a7c48f-f6dc-40a1-abc7-82dd1cea1af3"
      ),
      c: open("https://calendar.google.com"),
      m: open("https://mail.google.com"),
    },
    // o = "Open" applications
    o: {
      g: app("Google Chrome"),
      v: app("Visual Studio Code"),
      s: app("Slack"),
      t: app("Todoist"),
      i: app("iTerm"),
      0: app("Obsidian"),
      f: app("Finder"),
      p: app("Spotify"),
    },

    // s = "System"
    s: {
      e: {
        to: [
          {
            // Emoji picker
            key_code: "spacebar",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);

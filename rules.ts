import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, run, copy } from "./utils";

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
    a: {
      g: open("https://github.com"),
      // want to put "j", but for some reasons "j" does not work
      i: open(
        "https://borobudur.atlassian.net/jira/software/c/projects/PRCNG/boards/632?assignee=712020%3A73a7c48f-f6dc-40a1-abc7-82dd1cea1af3"
      ),
      c: open("https://calendar.google.com"),
      m: open("https://mail.google.com"),
      n: open(
        "https://gk-k8s-jenkins.ggwp.red/job/TEST/job/TIX-PRICING-DASHBOARD-NEXT-FE/build?delay=0sec"
      ),
      r: open(
        "https://arjuna.kepo.ninja/d/kubernetes-react-details/kubernetes-react-details?orgId=1\\&var-env=test\\&var-service_name=pricing-dashboard-next-fe\\&var-pod_name=All\\&var-namespace=pricing-dashboard-next-fe-ns\\&var-time_duration=1"
      ),
      k: open(
        "https://kotaro.kepo.ninja/d/kubernetes-react-details/kubernetes-react-details?orgId=1\\&refresh=30s\\&var-service_name=pricing-dashboard-next-fe\\&var-pod_name=All"
      ),
      o: open("https://inca.ggwp.red/ui/tiket/kv"),
      v: open(
        "https://gkkibana.ggwp.red/app/discover#/?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-24h,to:now))&_a=(columns:!(message),filters:!(),index:logs-pricing-dashboard-next-fe-hotel,interval:auto,query:(language:kuery,query:''),sort:!(!('@timestamp',desc)))"
      ),
      b: open(
        "https://kibana.ggwp.red/app/discover#/?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-24h,to:now))&_a=(columns:!(message),filters:!(),index:b216fbe0-9c79-11ed-af0b-d371d55a2212,interval:auto,query:(language:kuery,query:''),sort:!('@timestamp',desc))"
      ),
    },
    s: {
      g: app("Google Chrome"),
      v: app("Visual Studio Code"),
      k: app("Slack"),
      t: app("Todoist"),
      i: app("iTerm"),
      o: app("Obsidian"),
      f: app("Finder"),
      p: app("Spotify"),
    },
    d: {
      q: open("raycast://script-commands/dismiss-notifications"),
    },
    f: {
      l: copy("https://local.tiket.com:3001"),
      o: copy("https://gatotkaca.tiket.com/admin/member"),
      p: copy("405468"),
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

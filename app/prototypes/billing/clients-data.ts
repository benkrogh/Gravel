export interface ClientJob {
  id: string;
  name: string;
  address: string;
  color: string;
}

export interface Client {
  id: string;
  name: string;
  jobs: ClientJob[];
}

/** Saved clients & jobs, shared across the job/client picker in the create flow. */
export const clients: Client[] = [
  {
    id: "chen",
    name: "Chen Residence",
    jobs: [
      {
        id: "ridgeview",
        name: "Ridgeview Addition",
        address: "214 Ridgeview Ct, Portland, OR",
        color: "#1b3012",
      },
    ],
  },
  {
    id: "walsh",
    name: "Walsh Homes",
    jobs: [
      {
        id: "harbor",
        name: "Harbor St Kitchen",
        address: "88 Harbor St, Portland, OR",
        color: "#5e8d27",
      },
    ],
  },
  {
    id: "summit",
    name: "Summit Property",
    jobs: [
      {
        id: "oakmont",
        name: "Oakmont Roof Tear-off",
        address: "1502 Oakmont Ave, Beaverton, OR",
        color: "#404040",
      },
    ],
  },
  {
    id: "aperture",
    name: "Aperture Dev",
    jobs: [
      {
        id: "mill",
        name: "Mill District Lobby",
        address: "400 SE Mill St, Portland, OR",
        color: "#737373",
      },
      {
        id: "mill-annex",
        name: "Mill District Annex",
        address: "410 SE Mill St, Portland, OR",
        color: "#8a8a8a",
      },
    ],
  },
];

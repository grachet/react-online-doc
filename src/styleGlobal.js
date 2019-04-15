const baseStyles = {
  grow: {
    flexGrow: 1,
  },
  wmax: {
    width: "100% "
  },
  mrs: {
    marginRight: 5
  },
  mts: {
    marginTop: 5
  },
  mls: {
    marginLeft: 5
  },
  mbs: {
    marginBottom: 5
  },
  mrmd: {
    marginRight: 15
  },
  mtmd: {
    marginTop: 15
  },
  mlmd: {
    marginLeft: 15
  },
  mbmd: {
    marginBottom: 15
  },
  mxl: {
    marginLeft: 30,
    marginRight: 30

  },
  myl: {
    marginTop: 30,
    marginBottom: 30
  }
};

export default function createStyles(overrides = {}) {
  return {...baseStyles, ...overrides}
}
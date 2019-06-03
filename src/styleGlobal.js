import {drawerWidth} from "./data/const";

const spacing = () => {
  let spacingConst = {};
  ["margin", "padding"].forEach(type => {

    let sizes = ["s", "sm", "md", "l", "xl", "xxl", "xxxl"];
    let sides = ["Left", "Right", "Top", "Bottom"];

    //ms...
    sizes.forEach((size, i) => {
      spacingConst[type[0] + size] = {
        [type + "Left"]: (i + 1) * 6,
        [type + "Right"]: (i + 1) * 6,
        [type + "Top"]: (i + 1) * 6,
        [type + "Bottom"]: (i + 1) * 6
      }
    })

    //mys
    sizes.forEach((size, i) => {
      spacingConst[type[0] + "y" + size] = {
        [type + "Top"]: (i + 1) * 6,
        [type + "Bottom"]: (i + 1) * 6
      }
    })

    //mxs
    sizes.forEach((size, i) => {
      spacingConst[type[0] + "x" + size] = {
        [type + "Right"]: (i + 1) * 6,
        [type + "Left"]: (i + 1) * 6
      }
    })

    //mts...
    sides.forEach(side => {
      spacingConst[type[0] + side[0].toLowerCase() + "auto"] = {
        [type + side]: "auto"
      };
      sizes.forEach((size, i) => {
        spacingConst[type[0] + side[0].toLowerCase() + size] = {
          [type + side]: (i + 1) * 6
        }
      })
    })

  });
  return spacingConst
};

export const baseStyles = ({
  ...spacing(),
  flex: {
    display: "flex"
  },
  flexGrow: {
    flexGrow: 1,
  },
  w100: {
    width: "100%"
  },
  wM100: {
    maxWidth: "100%"
  },
  verticalAlignMiddle: {
    verticalAlign: "middle"
  },
  wmaxOpen: {
    maxWidth: "calc(100vw - 57px - " + drawerWidth + ")",
    overflowX: "auto"
  },
  wmaxClose: {
    maxWidth: "calc(100vw - 57px)",
    overflowX: "auto"
  },
  container: {
    justifyContent: 'center',
    paddingTop: 72 + 6 * 4,
    minHeight: "100vh",
    maxWidth: 1000,
    flexGrow: 1,
    padding: 6 * 4,
    margin: "auto"
  },
  warningText: {
    color: "#d93a3d"
  },
  warningButton: {
    backgroundColor: "#8e2829",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#a32d2f",
    }
  },
  fab: {
    position: 'fixed',
    bottom: 60,
    right: 60,
    zIndex: 1000
  },
  title: {
    fontSize: 20,
    color: "#000"
  },
  smallTitleRight: {
    float: "right",
    fontSize: "80%",
  },
  floatRight: {
    float: "right",
  },
  iconSmall: {
    fontSize: 20,
  },
  bgDanger: {
    backgroundColor: "#cc635e"
  },
  bgDangerLight: {
    backgroundColor: "rgba(204,99,94,0.2)",
  },
  textCenter: {
    textAlign: "center"
  },
  borderContainer: {
    backgroundColor: "rgba(0,0,0,0.03)",
    marginBottom: 6 * 4,
    padding: 6 * 3,
    borderRadius: 10
  }
});

export default function createStyles(overrides = {}, theme) {
  return {...baseStyles, ...overrides}
}

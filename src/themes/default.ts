import { createMuiTheme, fade } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#2D2D2D',
      light: '#424242'
    },
    background: {
      default: '#171717'
    },
    text: {
      primary: '#E0E0E0'
    }
  },
  typography: {
    fontSize: 12,
    caption: {
      fontSize: 14,
      fontWeight: 400
    },
    h4: {
      fontSize: 18,
      fontWeight: 300,
      lineHeight: '140%'
    },
    h5: {
      fontSize: 16,
      fontWeight: 300
    },
    h6: {
      fontSize: 12,
      fontWeight: 'bold'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        a: {
          textDecoration: 'none',
          color: '#A942E9'
        },
        '*::-webkit-scrollbar': {
          width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px #171717'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#A942E9',
          outline: '1px solid #424242'
        }
      }
    },

    MuiToolbar: {
      gutters: {
        paddingRight: 32,
        paddingLeft: 32
      }
    },

    MuiDialog: {
      scrollPaper: {
        alignItems: 'flex-start'
      }
    },

    MuiAvatar: {
      root: {
        width: 32,
        height: 32
      }
    },
    MuiInputBase: {
      root: {
        color: 'inherit'
      }
    },
    MuiInput: {
      colorSecondary: {
        backgroundColor: fade('#FFF', 0.9),
        color: '#2D2D2D',
        '&.MuiInput-underline:after': {
          borderBottomColor: '#E849BD'
        },
        '& .MuiInputBase-input': {
          marginLeft: 4
        }
      }
    },
    MuiFormLabel: {
      colorSecondary: {
        zIndex: 1,
        marginLeft: 4,
        color: fade('#000', 0.7),
        '&.Mui-focused': {
          marginLeft: 0,
          color: '#E849BD'
        }
      }
    },
    MuiSwitch: {
      colorPrimary: {
        '&&.Mui-checked': {
          color: '#A942E9'
        }
      },
      colorSecondary: {
        '&&.Mui-checked': {
          color: '#171717'
        }
      }
    },
    MuiButton: {
      sizeSmall: {
        marginLeft: 4,
        marginRight: 4,
        padding: 4,
        fontSize: 10,
        textTransform: 'capitalize'
      },
      sizeLarge: {
        borderRadius: 20,
        marginBottom: 16
      },
      containedPrimary: {
        backgroundColor: '#A942E9'
      },
      containedSecondary: {
        backgroundColor: '#E849BD'
      }
    },
    MuiChip: {
      colorPrimary: {
        backgroundColor: '#A942E9'
      },
      colorSecondary: {
        backgroundColor: '#171717'
      }
    },
    MuiAccordion: {
      root: {
        background: 'transparent',
        border: 0,
        color: '#E0E0E0'
      }
    },
    MuiFormControlLabel: {
      label: {
        fontSize: 12,
        padding: '0 4px'
      }
    },
    MuiCardHeader: {
      root: {
        borderBottom: `1px solid #171717`,
        padding: '8px 16px',
        fontSize: 14
      }
    },
    MuiTypography: {
      colorSecondary: {
        color: '#A942E9'
      }
    }
  }
});

export default theme;

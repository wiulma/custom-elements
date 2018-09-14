import {MDCSnackbar} from '@material/snackbar';

export default {

  STYLE: {
    SUCCESS: 'success',
    ERROR: 'error'
  },

  show(msg, style = "") {
    const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
    const dataObj = {
      message: msg
    };
    if (style !== "")
      snackbar.root_.classList.add(style);

    snackbar.listen('MDCSnackbar:hide', () => {
      if (style !== "")
        snackbar.root_.classList.remove(style);
    });
    snackbar.show(dataObj);
  }
}

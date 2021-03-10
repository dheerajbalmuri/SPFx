import * as React from "react";
import { useRef } from "react";
import * as PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Button, InputLabel, TextField } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import Styles from "./Tabs.module.scss";
import { BsFillPersonFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import styles from "../ReactInvoiceForm.module.scss";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import SignatureCanvas from "react-signature-canvas";
import { Clear } from "@material-ui/icons";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export function TabsWrappedLabel() {
  const sigCanvas = useRef(null);
  const clear = () => sigCanvas.current.clear();

  const { register, control, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const classes = useStyles();
  const [value, setValue] = React.useState("one");
  const [open, setOpen] = React.useState(false);

  const _handleOpen = () => {
    setOpen(true);
  };

  const _handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab
            value="BasicForm"
            label="Basic Form"
            wrapped
            {...a11yProps("BasicForm")}
          />
          <Tab
            value="AdvancedForm"
            label="Advanced Form"
            {...a11yProps("AdvancedForm")}
          />
          <Tab value="three" label="Item Three" {...a11yProps("three")} />
        </Tabs>
      </AppBar>
      <div className={Styles.form}>
        <TabPanel value={value} index="BasicForm">
          <div>
            <form onSubmit={handleSubmit(onsubmit)}>
              <BsFillPersonFill className={Styles.Person} />
              <label>
                {" "}
                <b>From</b>{" "}
              </label>
              <br />
              <input
                name="From"
                ref={register}
                placeholder="Your Company Name or Address"
                className={Styles.input}
              />
              {/* register an input */}
              <div className={Styles.invoiceNumberDiv}>
                <BiSearchAlt2 className={Styles.Person} />
                <label>
                  {" "}
                  <b>Invoice number</b>{" "}
                </label>
                <br />
                <input
                  name="From"
                  ref={register}
                  placeholder="Invoice Number"
                  className={Styles.invoiceNumber}
                />
                <br />
              </div>
              <div className={Styles.invoiceDateDiv}>
                <Controller
                  render={(props) => (
                    <TextField
                      inputRef={register({ required: true })}
                      {...props}
                      type="date"
                      label="Invoice Date"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                  name="occurrenceTimestamp"
                  control={control}
                ></Controller>
              </div>
              <BsFillPersonFill className={Styles.Person} />
              <label>
                {" "}
                <b>Bill To</b>{" "}
              </label>
              <br />
              <input
                name="Bill To"
                ref={register}
                placeholder="Your customer's billing address"
                className={Styles.input}
              />
              <hr />
              <MdModeEdit className={Styles.Person} />
              <label>
                {" "}
                <b>Description</b>{" "}
              </label>
              <br />
              <input
                name="Description"
                ref={register}
                placeholder="Description"
                multiple={true}
                className={Styles.inputDescription}
              />
              {errors.lastname && "Last name is required."}
              <div className={Styles.amountDiv}>
                <label>
                  {" "}
                  <b>Amount</b>{" "}
                </label>
                <br />
                <input
                  name="amount"
                  ref={register({ pattern: /\d+/ })}
                  className={Styles.inputAmount}
                />
                {errors.age && "Please enter number for amount."}
              </div>
              <div>
                <button
                  type="button"
                  className={Styles.addATaxButton}
                  onClick={_handleOpen}
                >
                  {" "}
                  Add A Tax
                </button>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={open}
                  onClose={_handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <div className={classes.paper}>
                      <h2 id="transition-modal-title">Transition modal</h2>
                      <p id="transition-modal-description">
                        react-transition-group animates me.
                      </p>
                      <MdModeEdit className={Styles.Person} />
                      <label>
                        {" "}
                        <b>Tax Name</b>{" "}
                      </label>
                      <br />
                      <input
                        name="Tax Name"
                        ref={register}
                        placeholder="Tax Name"
                        multiple={true}
                        className={Styles.inputDescription}
                      />
                      <MdModeEdit className={Styles.Person} />
                      <br />
                      <label>
                        {" "}
                        <b>Tax Rate %</b>{" "}
                      </label>
                      <br />
                      <input
                        name="Tax Rate %"
                        ref={register}
                        placeholder="Tax Rate %"
                        multiple={true}
                        className={Styles.inputDescription}
                      />
                      <br />
                      <button> Save Tax</button>
                      <hr />
                      <button onClick={_handleClose}>Close</button>
                    </div>
                  </Fade>
                </Modal>
              </div>
              <br />
              <BsFillPersonFill className={Styles.Person} />
              <label>
                {" "}
                <b>Terms and Conditions </b>{" "}
              </label>
              <br />
              <input
                name="Terms and Conditions"
                ref={register}
                placeholder="Optional"
                className={Styles.input}
              />
              <div className={Styles.signatureDiv}>
                <SignatureCanvas
                  penColor="black"
                  canvasProps={{
                    width: 150,
                    height: 120,
                    className: "sigCanvas",
                  }}
                />
                <button onClick={clear}> clear </button>
              </div>

              <button
                type="submit"
                name="Save Invoice, Print or Send via Email"
              >Save Invoice, Print or Send via Email</button>
            </form>
          </div>
        </TabPanel>
        <TabPanel value={value} index="AdvancedForm">
          Item Two
        </TabPanel>
        <TabPanel value={value} index="three">
          Item Three
        </TabPanel>
      </div>
    </div>
  );
}

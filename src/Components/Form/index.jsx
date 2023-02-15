import { useState } from "react";
import { FormContainer, ContainerForm, DateCol } from "./styles";
import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";
import { labs, propriedades } from "../../Data/mock";

function Form() {
  const barColor = "#00796B";
  const [propriedade, setPropriedade] = useState({});
  const [snack, setSnack] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const [success, setSuccess] = useState(false);
  const [cnpj, setCnpj] = useState("");
  const [laboratorio, setLaboratorio] = useState({
    id: 0,
    nome: "",
  });
  const [values, setValues] = useState({
    observacoes: "",
    nome: "",
    dataInicial: "",
    dataFinal: "",
  });

  const { vertical, horizontal, open } = snack;
  const handleObs = (observacoes) => (event) => {
    setValues({ ...values, [observacoes]: event.target.value });
  };
  const handleName = (nome) => (event) => {
    setValues({ ...values, [nome]: event.target.value });
  };
  const handleInitialDate = (dataInicial) => (event) => {
    setValues({ ...values, [dataInicial]: event.target.value });
  };
  const handleFinalDate = (dataFinal) => (event) => {
    setValues({ ...values, [dataFinal]: event.target.value });
  };
  const handlePropriedade = (e) => {
    setCnpj(
      propriedades.filter((p) => p.id === parseInt(e.target.value))[0].cnpj
    );
    setPropriedade({
      id: e.target.value,
      nome: propriedades.filter((p) => p.id === parseInt(e.target.value))[0]
        .nome,
    });
  };
  const handleLab = (e) => {
    setLaboratorio({
      id: e.target.value,
      nome: labs.filter((p) => p.id === parseInt(e.target.value))[0].nome,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack({ ...snack, open: false });
  };

  const save = () => {
    if (
      values.nome === "" ||
      values.dataInicial === "" ||
      values.dataFinal === "" ||
      laboratorio.id === 0 ||
      propriedade.id === 0
    ) {
      setSuccess(false);
      console.log({
        ...values,
        cnpj,
        infosPropriedade: { ...propriedade },
        laboratorio,
      });
    } else {
      setSuccess(true);
    }
    setSnack({ ...snack, open: true });
  };

  return (
    <FormContainer>
      <AppBar position="sticky" style={{ background: barColor }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          ></IconButton>
          <Typography
            variant="h6"
            component="div"
            align="left"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Teste front-end
          </Typography>
          <Button sx={{ color: "#fff" }} onClick={() => save()}>
            Salvar
          </Button>
        </Toolbar>
      </AppBar>
      <ContainerForm>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Nome *"
              variant="standard"
              fullWidth
              inputProps={{ maxLength: 40 }}
              value={values.nome}
              helperText={`${values.nome.length}/${40}`}
              onChange={handleName("nome")}
            />
          </Grid>
          <Grid item xs={6}>
            <DateCol>
              <TextField
                id="standard-basic"
                label="Data Inicial *"
                variant="standard"
                fullWidth
                type="datetime-local"
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleInitialDate("dataInicial")}
              />
              <TextField
                id="standard-basic"
                label="Data Final *"
                variant="standard"
                fullWidth
                type="datetime-local"
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleFinalDate("dataFinal")}
              />
            </DateCol>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
              <InputLabel id="prop">Propriedade *</InputLabel>
              <Select
                labelId="prop"
                defaultValue=""
                id="standard-basic"
                label="Propriedade *"
                variant="standard"
                fullWidth
                onChange={(e) => handlePropriedade(e)}
              >
                {propriedades.map((p) => (
                  <MenuItem value={p.id.toString()} key={p.id}>
                    {p.nome}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {cnpj.length > 0 ? "CNPJ: " : ""}
                {cnpj}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
              <InputLabel id="demo-simple-select-standard-label">
                Laboratório *
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="labs"
                label="Laboratório *"
                variant="standard"
                defaultValue=""
                fullWidth
                onChange={(e) => handleLab(e)}
              >
                {labs.map((l) => (
                  <MenuItem value={l.id.toString()} key={l.id}>
                    {l.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-basic"
              label="Observações"
              variant="standard"
              fullWidth
              multiline
              rows={4}
              inputProps={{ maxLength: 1000 }}
              value={values.observacoes}
              helperText={`${values.observacoes.length}/${1000}`}
              onChange={handleObs("observacoes")}
            />
          </Grid>
        </Grid>
      </ContainerForm>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        {success ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
            variant="filled"
          >
            Cadastro realizado com sucesso!
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
            variant="filled"
          >
            Preencha os campos obrigatórios.
          </Alert>
        )}
      </Snackbar>
    </FormContainer>
  );
}

export default Form;

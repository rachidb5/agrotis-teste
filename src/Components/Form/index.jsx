import { useContext } from "react";
import { FormContainer, ContainerForm, DateCol, Space } from "./styles";
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
import Context from "../../Context/Context";

function Form() {
  const barColor = "#00796B";
  const {
    propriedade,
    setPropriedade,
    validate,
    setValidate,
    snack,
    setSnack,
    success,
    setSuccess,
    cnpj,
    setCnpj,
    laboratorio,
    setLaboratorio,
    values,
    setValues,
    dateMessage,
    setDateMessage,
    errorMessage,
    setErrorMessage
  } = useContext(Context);

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
    setValidate(true);
    if (
      values.nome === "" ||
      values.dataInicial === "" ||
      values.dataFinal === "" ||
      laboratorio.id === undefined ||
      propriedade.id === undefined
    ) {
      setSuccess(false);
    } else if (new Date(values.dataFinal) < new Date(values.dataInicial)) {
      setSuccess(false);
      setDateMessage("A data final deve ser posterior a data inicial");
      setErrorMessage("Insira datas válidas")
    } else {
      setSuccess(true);
      setValidate(false);
      console.log({
        ...values,
        cnpj,
        infosPropriedade: { ...propriedade },
        laboratorio,
      });
      setValues({
        observacoes: "",
        nome: "",
        dataInicial: "",
        dataFinal: "",
      });
      setCnpj("");
      setLaboratorio({});
      setPropriedade({});
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
          <Button type="submit" sx={{ color: "#fff" }} onClick={() => save()}>
            Salvar
          </Button>
        </Toolbar>
      </AppBar>
      <ContainerForm>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <TextField
              color="success"
              id="standard-basic"
              label="Nome *"
              variant="standard"
              fullWidth
              inputProps={{ maxLength: 40 }}
              value={values.nome}
              helperText={
                validate && values.nome.length === 0
                  ? "Preencha o campo nome"
                  : `${values.nome.length}/${40}`
              }
              onChange={handleName("nome")}
              error={validate && values.nome.length === 0}
            />
          </Grid>
          <Grid item xs={6}>
            <DateCol>
              <TextField
                            color="success"
                id="standard-basic"
                label="Data Inicial *"
                variant="standard"
                fullWidth
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                value={values.dataInicial}
                onChange={handleInitialDate("dataInicial")}
                error={validate && values.dataInicial.length === 0}
                helperText={
                  validate && values.dataInicial.length === 0
                    ? "Preencha a data inicial"
                    : ""
                }
              />
              <Space></Space>
              <TextField
                            color="success"
                value={values.dataFinal}
                id="standard-basic"
                label="Data Final *"
                variant="standard"
                fullWidth
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleFinalDate("dataFinal")}
                error={
                  validate &&
                  (values.dataFinal.length === 0 ||
                    new Date(values.dataFinal) < new Date(values.dataInicial))
                }
                helperText={
                  validate &&
                  (values.dataFinal.length === 0 ||
                    new Date(values.dataFinal) < new Date(values.dataInicial))
                    ? dateMessage
                    : ""
                }
              />
            </DateCol>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
              <InputLabel id="prop">Propriedade *</InputLabel>
              <Select
                labelId="prop"
                color="success"
                defaultValue=""
                id="standard-basic"
                label="Propriedade *"
                variant="standard"
                fullWidth
                onChange={(e) => handlePropriedade(e)}
                error={validate && propriedade.id === undefined}
              >
                {propriedades.map((p) => (
                  <MenuItem value={p.id.toString()} key={p.id}>
                    {p.nome}
                  </MenuItem>
                ))}
              </Select>
              {validate && propriedade.id === undefined ? (
                <FormHelperText error>Escolha uma propriedade</FormHelperText>
              ) : (
                <FormHelperText>
                  {cnpj.length > 0 ? "CNPJ: " : ""}
                  {cnpj}
                </FormHelperText>
              )}
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
                color="success"
                label="Laboratório *"
                variant="standard"
                defaultValue=""
                fullWidth
                onChange={(e) => handleLab(e)}
                error={validate && laboratorio.id === undefined}
              >
                {labs.map((l) => (
                  <MenuItem value={l.id.toString()} key={l.id}>
                    {l.nome}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText error>
                {validate && laboratorio.id === undefined
                  ? "Escolha um laboratório"
                  : ""}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-basic"
              color="success"
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
            {errorMessage}
          </Alert>
        )}
      </Snackbar>
    </FormContainer>
  );
}

export default Form;

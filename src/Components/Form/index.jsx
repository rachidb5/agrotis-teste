import { useState } from "react";
import { FormContainer, ContainerForm } from "./styles";
import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  Grid,
} from "@mui/material";

function Form() {
  const barColor = "#00796B";
  const [values, setValues] = useState({
    name: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
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
            align="start"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Teste front-end
          </Typography>
          <Button sx={{ color: "#fff" }}>Salvar</Button>
        </Toolbar>
      </AppBar>
      <ContainerForm>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Nome"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="standard-basic"
              label="Nome"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="standard-basic"
              label="Nome"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Nome"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Nome"
              variant="standard"
              fullWidth
            />
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
              value={values.name}
              helperText={`${values.name.length}/${1000}`}
              onChange={handleChange("name")}
            />
          </Grid>
        </Grid>
      </ContainerForm>
    </FormContainer>
  );
}

export default Form;

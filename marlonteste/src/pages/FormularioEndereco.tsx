import { Box, Button, Hidden, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";

const initialValues = {
    cpf: "",
    tipoendereco: "Residencial",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cep: "",
    cidade: "",
    uf: "",

};

export default function FormularioEndereco(props: any) {

    const { addOrEditEndereco,
        recordForEditEndereco,
        setOpenPopupEndereco,
        cpfPai,
        recordsEndereco,
        setRecordsEndereco

    } = props;

    const [values, setValues] = useState(initialValues);

    const [valor, setValor] = useState(false)

    useEffect(() => {
    if (recordForEditEndereco !== null) {
        setValues({
            ...recordForEditEndereco,
        });
        

    }
    }, [recordForEditEndereco]);



    useEffect(()=> {
        setValues({...values, cpf: cpfPai})
    }, [])



    const handleSubmit = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        if (recordForEditEndereco !== null) {
            addOrEditEndereco(values, false);
        } else {
            addOrEditEndereco(values, true);
        }
    };

    function onClickCancelar() {
        setOpenPopupEndereco(false);
    }


    function handleInputChange(e: any) {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container>
                    <Grid item md={6} xs={4}>
                        <TextField sx={{ m: 1, width: '20ch' }}
                            id="SelectTipoEndereco"
                            select
                            name="tipoendereco"
                            label="Tipo Endereço"
                            defaultValue={"Residencial"}
                            onChange={handleInputChange}
                        >
                            <MenuItem value={"Residencial"}>Residencial</MenuItem>
                            <MenuItem value={"Comercial"}>Comercial</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item md={6} xs={2} >
                        <TextField sx={{ m: 1, width: '30ch' }}
                            name="endereco"
                            label="Endereço"
                            value={values.endereco}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item md={6} xs={2} >
                        <TextField sx={{ m: 1, width: '13ch' }}
                            name="numero"
                            label="Número"
                            value={values.numero}
                            onChange={handleInputChange}
                            required

                        />
                    </Grid>
                    <Grid item md={6} xs={2} >
                        <TextField sx={{ m: 1, width: '20ch' }}
                            name="complemento"
                            label="Complemento"
                            value={values.complemento}
                            onChange={handleInputChange}

                        />
                    </Grid>
                    <Grid item md={6} xs={2} >
                        <TextField sx={{ m: 1, width: '30ch' }}
                            name="bairro"
                            label="Bairro"
                            value={values.bairro}
                            onChange={handleInputChange}

                        />
                    </Grid>
                    <Grid item md={6} xs={2} >
                        <TextField sx={{ m: 1, width: '15ch' }}
                            name="cep"
                            label="CEP"
                            value={values.cep.replace(/\D/g, '')
                            .replace(/(\d{5})(\d)/, '$1-$2')
                            .replace(/(-\d{3})\d+?$/, '$1')}
                            onChange={handleInputChange}

                        />
                    </Grid>
                    <Grid item md={6} xs={2} >
                        <TextField sx={{ m: 1, width: '30ch' }}
                            name="cidade"
                            label="Cidade"
                            value={values.cidade}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid md={6} xs={2} >
                        <TextField sx={{ m: 1, width: '30ch' }}
                            name="uf"
                            label="Estado"
                            value={values.uf}
                            onChange={handleInputChange}

                        />
                    </Grid>
                </Grid>
                <Stack direction={"row"} alignItems={"center"}
                            justifyContent={"center"} spacing={8}>
                    <Button variant="text" onClick={onClickCancelar}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                        Confirmar
                    </Button>
                </Stack>
            </Box>
        </form>
    );
}



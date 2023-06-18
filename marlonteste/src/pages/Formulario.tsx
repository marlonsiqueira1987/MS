import { Alert, Box, Button, Dialog, DialogTitle, Divider, Fab, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Button as MuiButton } from '@mui/material'
import FormularioEndereco from "./FormularioEndereco";
import React from "react";
import { toast } from "react-toastify";

const initialValues = {
    tipopessoa: "Física",
    nomepessoa: "",
    cpf: "",
    telefone: "",
    email: "",

};

const initialValuesEndereco = {
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

export default function Formulario(props: any) {

    const { addOrEdit,
        recordForEdit,
        setOpenPopup,
        recordsEndereco,
        setRecordsEndereco

    } = props;

    const [values, setValues] = useState(initialValues);
    const [valuesEndereco, setValuesEndereco] = useState<any[]>([]);
    const [records, setRecords] = useState<any[]>([]);
    const [cpfPai, setCpfPai] = useState("")

    const [recordForEditEndereco, setRecordForEditEndereco] = useState(null);
    const [message, setMessage] = useState("");
    const [openPopupEndereco, setOpenPopupEndereco] = useState(false);
    const [popupTitleEndereco, setPopupTitleEndereco] = useState("");
    const [exibirModalConfirmacao, setExibirModalConfirmacao] = useState(false);
    const [codigoExcluir, setCodigoExcluir] = useState("");

    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    const [filterFn] = useState({
        fn: (items: any) => {
            return items;
        },
    });
    
    const [valor, setValor] = useState(false)

    useEffect(() => {
        if (recordForEdit !== null) {
            setValues({
                ...recordForEdit,
            });
            let temEndereco = recordsEndereco.filter(
                (x: any) => x.cpf === recordForEdit.cpf
            )
            setValuesEndereco(temEndereco)

            setCpfPai(recordForEdit.cpf)

        }
    }, [recordForEdit]);

    function validateDate() {

        if (records.length === 0) {
            return false;
        }
        return true;
    }

    const openInPopupEndereco = (e: any, item: any) => {
        e.preventDefault();
        e.stopPropagation();
        setRecordForEditEndereco(item);
        setOpenPopupEndereco(true);

    };

    useEffect(() => {

        // if(valuesEndereco !== null){
            
        //     setValuesEndereco(recordsEndereco)
        // }else{
        //     setValuesEndereco(valuesEndereco)
        // }

    })


    const addOrEditEndereco = (item: any, isAlterar: boolean) => {
        let atualizacao = recordsEndereco.map((x: any) => {
            return x.codigo === item.codigo
                ? item : x
        });
        if (isAlterar) {
            setRecordsEndereco([...recordsEndereco, { ...item, codigo: new Date().getTime(), cpf: cpfPai }]);
            
            setRecordForEditEndereco(null);
            setOpenPopupEndereco(false);

            
            setNotify({
                isOpen: true,
                message,
                type: "success",
            });
        } else {
            setRecordsEndereco(atualizacao);
            setRecordForEditEndereco(null);
            setOpenPopupEndereco(false);

            setNotify({
                isOpen: true,
                message: "Alterado com sucesso.",
                type: "success",
            });
        }

    };

    const onDelete = (codigo: any) => {


        
        let novosItens = valuesEndereco.filter(
            (x: any) => x.codigo !== codigo
        )

        setValuesEndereco(novosItens);

        let novosItensLista = recordsEndereco.filter(
            (x: any) => x.codigo !== codigo
        )
        setRecordsEndereco(novosItensLista);



        setNotify({
            isOpen: true,
            message: "Excluído com sucesso!",
            type: "success",
        });
        setExibirModalConfirmacao(false);

    };

    function handlExcluir(codigo: any) {
        setExibirModalConfirmacao(false);
        onDelete(codigo);
    }

    function handleAbrirConfirmacao() {
        setExibirModalConfirmacao(true);
    }

    function handleSituacao(codigo: any) {
        setCodigoExcluir(codigo)
    }

    function showAlert() {
        const notify = (status: any) => {
          if (status === 200) {
            toast.success("Sucesso!");
          } else {
            toast.error("Erro!");
          }
        };
      }


    function compareObjects(objA: any, objB: any) {
        let objAKeys = Object.keys(objA);
        return objAKeys.filter((key) => objA[key] !== objB[key]);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (recordForEdit !== null) {
            addOrEdit(values, false);
        } else {
            addOrEdit(values, true);
        }
    };

    function onClickCancelar() {
        setOpenPopup(false);
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
            <Box justifyItems={"center"} sx={{ flexGrow: 1 }}>
                <Grid container>
                    <Grid item >
                        <TextField sx={{ m: 1, width: '12ch' }}
                            id="SelectTipoPessoa"
                            select
                            name="tipopessoa"
                            label="Tipo Pessoa"
                            defaultValue={"Física"}
                            value={values.tipopessoa}
                            onChange={handleInputChange}
                            required
                        >
                            <MenuItem value={"Física"}>Física</MenuItem>
                            <MenuItem value={"Jurídica"}>Jurídica</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item >
                        <TextField sx={{ m: 1, width: '30ch' }}
                            name="nomepessoa"
                            label="Nome / Razão Social"
                            value={values.nomepessoa}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item  >
                        <TextField sx={{ m: 1, width: '20ch' }}
                            name="cpf"
                            label="CPF / CNPJ"
                            value={values.tipopessoa === "Física" ?
                                values.cpf.replace(/\D/g, '')
                                    .replace(/(\d{3})(\d)/, '$1.$2')
                                    .replace(/(\d{3})(\d)/, '$1.$2')
                                    .replace(/(\d{3})(\d)/, '$1-$2')
                                    .replace(/(-\d{2})\d+?$/, '$1') :
                                values.cpf.replace(/\D/g, '')
                                    .replace(/(\d{2})(\d)/, '$1.$2')
                                    .replace(/(\d{3})(\d)/, '$1.$2')
                                    .replace(/(\d{3})(\d)/, '$1/$2')
                                    .replace(/(\d{4})(\d)/, '$1-$2')
                                    .replace(/(-\d{2})\d+?$/, '$1')}
                            onChange={handleInputChange}
                            required

                        />
                    </Grid>
                    <Grid item   >
                        <TextField sx={{ m: 1, width: '17ch' }}
                            name="telefone"
                            label="Telefone"
                            value={values.telefone.replace(/\D/g, '')
                                .replace(/(\d{2})(\d)/, '($1) $2')
                                .replace(/(\d{5})(\d)/, '$1-$2')
                                .replace(/(-\d{4})\d+?$/, '$1')}
                            onChange={handleInputChange}
                            required

                        />
                    </Grid>
                    <Grid item  >
                        <TextField sx={{ m: 1, width: '40ch' }}
                            name="email"
                            label="E-mail"
                            value={values.email}
                            onChange={handleInputChange}

                        />
                    </Grid>
                </Grid>

            </Box>
            <Stack paddingTop={4}>
                <Paper>

                    <Grid container direction="row"
                        justifyContent="center"
                        alignItems="center" >
                        <Grid item>
                            <Typography variant="h6"
                                style={{ marginLeft: "10px", border: "none", minWidth: "90%", textAlign: "start" }} >
                                Lista de Endereços
                            </Typography>
                        </Grid>
                    </Grid>

                    <Stack paddingTop={4}>
                        <Stack
                            justifyContent="flex-start"
                        >

                            <Fab
                                disabled={values.cpf === ""}
                                variant="extended"
                                //type="submit"
                                size="small"
                                color={"primary"}
                                onClick={(e: any) => {
                                    setCpfPai(values.cpf);
                                    setOpenPopupEndereco(true);
                                    setRecordForEditEndereco(null);
                                    setPopupTitleEndereco("Cancelar | Confirmar alterações de Endereços");

                                    setMessage("Cadastro realizada com sucesso.");
                                }}
                            >
                                <AddCircleOutlineIcon sx={{ mr: 1 }} />
                                Cadastrar Endereços
                            </Fab>

                        </Stack>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tipo Endereço</TableCell>
                                    <TableCell>Endereço</TableCell>
                                    <TableCell>Número</TableCell>
                                    <TableCell>Complemento</TableCell>
                                    <TableCell>Bairro</TableCell>
                                    <TableCell>CEP</TableCell>
                                    <TableCell>Cidade</TableCell>
                                    <TableCell>UF</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {valuesEndereco.map(
                                    (item: any, index: any) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {item.tipoendereco}
                                            </TableCell>
                                            <TableCell>
                                                {item.endereco}
                                            </TableCell>
                                            <TableCell>
                                                {item.numero}
                                            </TableCell>
                                            <TableCell>
                                                {item.complemento}
                                            </TableCell>
                                            <TableCell>
                                                {item.bairro}
                                            </TableCell>
                                            <TableCell>
                                                {item.cep}
                                            </TableCell>
                                            <TableCell>
                                                {item.cidade}
                                            </TableCell>
                                            <TableCell>
                                                {item.uf}
                                            </TableCell>
                                            <TableCell>
                                                <MuiButton
                                                    onClick={(e: any) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setCodigoExcluir(item.codigo);
                                                        onDelete(item.codigo)
                                                    }} >

                                                    <DeleteIcon fontSize="small" />
                                                </MuiButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>

                        </Table>
                        <Stack direction={"row"} alignItems={"center"}
                            justifyContent={"center"} spacing={8}
                        >
                            <Button variant="text" onClick={onClickCancelar}>
                                Cancelar
                            </Button>
                            <Button variant="contained" color="primary" type="submit">
                                Confirmar
                            </Button>
                        </Stack>
                    </Stack>

                    <Dialog
                        sx={{
                            "& .MuiPaper-root": { minHeight: "10%", minWidth: "35%" },
                        }}
                        open={openPopupEndereco}
                        onClose={setOpenPopupEndereco}
                        title={popupTitleEndereco}
                    >
                        <DialogTitle align="center">
                            {"Cadastro de Endereços"}
                        </DialogTitle>
                        <FormularioEndereco
                            setOpenPopupEndereco={setOpenPopupEndereco}
                            addOrEditEndereco={addOrEditEndereco}
                            recordForEditEndereco={recordForEditEndereco}
                            cpfPai={cpfPai}
                            recordsEndereco={recordsEndereco}
                            setRecordsEndereco={setRecordsEndereco}
                        />
                    </Dialog>
                </Paper>
            </Stack >

        </form>
    );
}



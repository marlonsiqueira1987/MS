import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InsertChartOutlinedRoundedIcon from '@mui/icons-material/InsertChartOutlinedRounded';
import AddHomeIcon from "@mui/icons-material/AddHome";
import Modal from '@mui/material/Modal';
import {
    Alert,
    Box,
    Button,
    Chip,
    Dialog,
    DialogTitle,
    Fab, Grid, InputAdornment, Paper, SelectChangeEvent, Stack, TableBody,
    TextField,
    Typography,
    isMuiElement
} from "@mui/material";
import { useEffect, useState } from "react";
import { Button as MuiButton } from '@mui/material'
import { Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material';
import Formulario from "../pages/Formulario";
import FormularioEndereco from "./FormularioEndereco";
import React from "react";
import { toast } from "react-toastify";

const headCells = [
    { id: "codigoSubSetorAtividade", label: "Subsetor" },
    { id: "codigoRamoAtividade", label: "Ramo Atividade", disableSorting: true },
    {
        id: "codigoAtividade",
        label: "Atividade Econômica",
        disableSorting: true,
    },
    { id: "acoes", label: "", disableSorting: true },
];

const initialValues = {
    autoSelecionado: "",

};

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Cadastro() {
    const [exibirLoad, setExibirLoad] = useState(false);
    const [mensagemLoad, setMensagemLoad] = useState("");
    const [records, setRecords] = useState<any[]>([]);
    const [recordsPesquisa, setRecordsPesquisa] = useState<any[]>([]);
    const [recordsEndereco, setRecordsEndereco] = useState<any[]>([]);
    const [values, setValues] = useState(initialValues);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [listaChecklist, setListaChecklist] = useState<any[]>([]);
    // const [recordForEditEndereco, setRecordForEditEndereco] = useState(null);
    const [message, setMessage] = useState("");
    const [openPopup, setOpenPopup] = useState(false);
    // const [openPopupEndereco, setOpenPopupEndereco] = useState(false);
    const [popupTitle, setPopupTitle] = useState("");
    // const [popupTitleEndereco, setPopupTitleEndereco] = useState("");
    const [exibirModalConfirmacao, setExibirModalConfirmacao] = useState(false);
    const [codigoExcluir, setCodigoExcluir] = useState("");
    const [atividade, setAtividade] = useState("");
    const [isSave, setIsSave] = useState(false);
    const [firstTime, setFirstTime] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openConfirmation, setOpenConfirmation] = React.useState(false);
    const handleOpenConfirmation = () => setOpenConfirmation(true);
    const handleCloseConfirmation = () => setOpenConfirmation(false);

    const [busca, setBusca] = useState("");

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

    useEffect(() => {

        setValues({
            autoSelecionado: ''
        })

    }, [])


    function validateDate() {

        if (records.length === 0) {
            return false;
        }
        return true;
    }

    const openInPopup = (e: any, item: any) => {
        e.preventDefault();
        e.stopPropagation();
        setRecordForEdit(item);
        setOpenPopup(true);

    };


    useEffect(() => {
        setListaChecklist(records)
    }, [records, recordsEndereco, recordsPesquisa])

    const addOrEdit = (item: any, isAlterar: boolean) => {
        handleAbrirConfirmacao();
        handleOpen();
        let atualizacao = records.map((x: any) => {
            return x.codigo === item.codigo
                ? item : x
        });
        if (isAlterar) {
            setRecords([...records, { ...item, codigo: new Date().getTime() }]);
            //setRecordsPesquisa(records);
            setRecordForEdit(null);
            setOpenPopup(false);
            setNotify({
                isOpen: true,
                message,
                type: "success",
            });


        } else {
            setRecords(atualizacao);
            //setRecordsPesquisa(atualizacao);
            setRecordForEdit(null);
            setOpenPopup(false);
            setNotify({
                isOpen: true,
                message: "Alterado com sucesso.",
                type: "success",
            });
        }


    };

    const onDelete = (codigo: any) => {

        let novosItens = records.filter(
            (x: any) => x.codigo !== codigo
        )
        setRecords(novosItens);
        setRecordsPesquisa(novosItens);


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

    function compareObjects(objA: any, objB: any) {
        let objAKeys = Object.keys(objA);
        return objAKeys.filter((key) => objA[key] !== objB[key]);
    }

    function handleInputChange(e: any) {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }


    useEffect(() => {
        setRecordsPesquisa(records)
    }, [records, recordsEndereco, recordsPesquisa])

    useEffect(() => {

        if (recordsPesquisa === null) {

            setRecordsPesquisa(records)
        } else {
            if (busca !== '') {
                setRecordsPesquisa(recordsPesquisa)
            } else {
                setRecordsPesquisa(records)
            }
        }

    })

    const ListaPessoas = (nomepessoa: any) => {
        const teams = records.filter((team) => team.nomepessoa.includes(nomepessoa));
        setRecordsPesquisa(teams);
    };


    return (
        <form
            onSubmit={(e: any) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <Stack paddingTop={4}>
                <Paper>
                <br></br>
                    <Grid container direction="row"
                        justifyContent="center"
                        alignItems="center" >
                        <Grid>
                            <Typography variant="h2"
                                style={{ marginLeft: "10px", border: "none", minWidth: "90%", textAlign: "start" }} >
                                Teste da Basis
                            </Typography>
                        </Grid>
                    </Grid>
                    <br></br>
                </Paper>
                <br></br>
                <br></br>
                <br></br>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} >
                    <TextField sx={{ m: 1, width: '30ch' }}
                        id="busca"
                        name="busca"
                        label="Pesquisar por Nome"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}

                    />
                    <Button type="submit" variant="contained" color="primary"
                        onClick={(e: any) => {
                            ListaPessoas(busca);
                        }}
                    > Pesquisar
                    </Button>
                </Stack>

                <Paper>
                <br></br>
                <br></br>
                    <Grid container direction="row"
                        justifyContent="center"
                        alignItems="center" >
                        <Grid>
                            <Typography variant="h5"
                                style={{ marginLeft: "10px", border: "none", minWidth: "90%", textAlign: "start" }} >
                                Lista de Pessoas
                            </Typography>
                        </Grid>
                    </Grid>

                    <Stack paddingTop={4}>
                        <Stack
                            justifyContent="flex-start"
                        >
                            <Fab
                                variant="extended"
                                type="submit"
                                size="small"
                                color={"primary"}
                                onClick={(e: any) => {
                                    setOpenPopup(true);
                                    setRecordForEdit(null);
                                    setPopupTitle("Cancelar | Confirmar alterações de Pessoas");
                                    setMessage("Cadastro realizado com sucesso.");

                                }}
                            >
                                <AddCircleOutlineIcon sx={{ mr: 1 }} />
                                Cadastrar Pessoas
                            </Fab>
                        </Stack>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tipo Pessoa</TableCell>
                                    <TableCell>Nome / Razão Social</TableCell>
                                    <TableCell>CPF / CNPJ</TableCell>
                                    <TableCell>Telefone</TableCell>
                                    <TableCell>E-mail</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {recordsPesquisa.map(
                                    (item: any, index: any) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {item.tipopessoa}
                                            </TableCell>
                                            <TableCell>
                                                {item.nomepessoa}
                                            </TableCell>
                                            <TableCell>
                                                {item.cpf}
                                            </TableCell>
                                            <TableCell>
                                                {item.telefone}
                                            </TableCell>
                                            <TableCell>
                                                {item.email}
                                            </TableCell>
                                            <TableCell>
                                                <MuiButton
                                                    onClick={(e: any) => {
                                                        openInPopup(e, item);
                                                        setPopupTitle("Alterar Cadastro");
                                                    }}
                                                >

                                                    <EditOutlinedIcon fontSize="small" />

                                                </MuiButton>
                                                <MuiButton
                                                    //onClick={(e: any) => {e.handleOpenConfirmation2(item.codigo)}}
                                                    onClick={handleOpenConfirmation}
                                                >

                                                    <DeleteIcon fontSize="small" />
                                                </MuiButton>
                                                <Modal
                                                    open={openConfirmation}
                                                    onClose={handleCloseConfirmation}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style}>
                                                        <Typography id="modal-modal-title" variant="h6" component="h2" color={"black"} align="center">
                                                            Deseja realmente excluir a informação?
                                                        </Typography>
                                                        <br></br>
                                                        <Stack direction={"row"} alignItems={"flex-end"}
                                                            justifyContent={"space-between"} spacing={8}
                                                        >
                                                            <Button variant="text" onClick={handleCloseConfirmation}>
                                                                Cancelar
                                                            </Button>
                                                            <Button variant="contained" color="primary" type="submit"
                                                                onClick={(e: any) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    setCodigoExcluir(item.codigo);
                                                                    onDelete(item.codigo)
                                                                    handleCloseConfirmation();
                                                                    handleOpen();
                                                                }}
                                                            >
                                                                Confirmar
                                                            </Button>
                                                        </Stack>
                                                    </Box>
                                                </Modal>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </Stack>

                    <Dialog
                        sx={{
                            "& .MuiPaper-root": { minHeight: "10%", minWidth: "70%" },
                        }}
                        open={openPopup}
                        onClose={setOpenPopup}
                        title={popupTitle}
                    >
                        <DialogTitle align="center">
                            {"Cadastro de Pessoa"}
                        </DialogTitle>
                        <Formulario
                            setOpenPopup={setOpenPopup}
                            addOrEdit={addOrEdit}
                            recordForEdit={recordForEdit}
                            recordsEndereco={recordsEndereco}
                            setRecordsEndereco={setRecordsEndereco}

                        />
                    </Dialog>
                    <div>
                        
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2" color={"green"} align="center">
                                    Sucesso!
                                </Typography>
                              
                            </Box>
                        </Modal>

                    </div>
                </Paper>
            </Stack >
        </form >


    );
}

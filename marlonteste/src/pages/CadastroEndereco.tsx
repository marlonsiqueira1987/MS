import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InsertChartOutlinedRoundedIcon from '@mui/icons-material/InsertChartOutlinedRounded';
import {
    Chip,
    Dialog,
    DialogTitle,
    Fab, Grid, Paper, Stack, TableBody,
    Typography,
    isMuiElement
} from "@mui/material";
import { useEffect, useState } from "react";
import { Button as MuiButton } from '@mui/material'

import { Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material';
import FormularioEndereco from "../pages/FormularioEndereco";

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

const subSetorList = [
    { id: "0", value: "SubSetor0" },
    { id: "1", value: "SubSetor1" },
    { id: "2", value: "SubSetor2" },
    { id: "3", value: "SubSetor3" }
]

const ramoAtividade = [
    { id: "0", value: "ramoAtividade0" },
    { id: "1", value: "ramoAtividade1" },
    { id: "2", value: "ramoAtividade2" },
    { id: "3", value: "ramoAtividade3" }
]

const atividadeEconomica = [
    { id: "0", value: "atividadeEconomica0" },
    { id: "1", value: "atividadeEconomica1" },
    { id: "2", value: "atividadeEconomica2" },
    { id: "3", value: "atividadeEconomica3" }
]

export default function Cadastro() {
    const [exibirLoad, setExibirLoad] = useState(false);
    const [mensagemLoad, setMensagemLoad] = useState("");
    const [records, setRecords] = useState<any[]>([]);
    const [oldValues, setOldValues] = useState<any[]>([]);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [message, setMessage] = useState("");
    const [openPopupEndereco, setOpenPopupEndereco] = useState(false);
    const [popupTitle, setPopupTitle] = useState("");
    const [exibirModalConfirmacao, setExibirModalConfirmacao] = useState(false);
    const [codigoExcluir, setCodigoExcluir] = useState("");
    const [atividade, setAtividade] = useState("");
    const [isSave, setIsSave] = useState(false);
    const [firstTime, setFirstTime] = useState(false);
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

    // const { TblContainer, TblHead, recordsAfterPagingAndSorting } = UseTable(
    //     records,
    //     headCells,
    //     filterFn
    // );



    function carregaCadastro(response: any) {
        setRecords(response)
        setOldValues(response)
    }



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
        setOpenPopupEndereco(true);

    };

    useEffect(() => {
        console.log("Dados recebidos.", records)
    }, [records])

    const addOrEditEndereco = (item: any, isAlterar: boolean) => {
        let atualizacao = records.map((x: any) => {
            return x.codigo === item.codigo
                ? item : x
        });
        if (isAlterar) {
            setRecords([...records, { ...item, codigo: new Date().getTime() }]);
            setRecordForEdit(null);
            setOpenPopupEndereco(false);
            setNotify({
                isOpen: true,
                message,
                type: "success",
            });
        } else {
            setRecords(atualizacao);
            setRecordForEdit(null);
            setOpenPopupEndereco(false);
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

    /** Função que verifica se houve mudança nos campos */

    function compareObjects(objA: any, objB: any) {
        let objAKeys = Object.keys(objA);
        return objAKeys.filter((key) => objA[key] !== objB[key]);
    }

    return (
        <form
            onSubmit={(e: any) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <Stack paddingTop={4}>
                <Paper>

                    <Grid container direction="row"
                        justifyContent="space-between"
                        alignItems="center" >
                        <Grid item md={4} xs={4}>
                            <Typography variant="h6"
                                style={{ marginLeft: "10px", border: "none", minWidth: "90%", textAlign: "start" }} >
                                Cadastro de Endereços
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
                                disabled={records.length >= 5}
                                onClick={(e: any) => {
                                    setOpenPopupEndereco(true);
                                    setRecordForEdit(null);
                                    setPopupTitle("Adicionar Pessoas");
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
                                {records.map(
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
                                                        openInPopup(e, item);
                                                        setPopupTitle("Alterar Cadastro");
                                                    }}
                                                >

                                                    <EditOutlinedIcon fontSize="small" />

                                                </MuiButton>
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
                    </Stack>

                    <Dialog
                        sx={{
                            "& .MuiPaper-root": { minHeight: "10%", minWidth: "30%" },
                        }}
                        open={openPopupEndereco}
                        onClose={setOpenPopupEndereco}
                        title={popupTitle}
                    >
                        <DialogTitle>
                            {"Formulário de Endereços"}
                        </DialogTitle>
                        <FormularioEndereco
                            setOpenPopup={setOpenPopupEndereco}
                            addOrEditEndereco={addOrEditEndereco}
                            recordForEdit={recordForEdit}

                        />
                    </Dialog>
                    {/* { <ModalConfirmacao
                        exibirModal={exibirModalConfirmacao}
                        setExibirModal={setExibirModalConfirmacao}
                        handleConfirmar={() => handlExcluir(codigoExcluir, isSave)}
                        texto={
                            "Confirmar a exclusão da atividade " +
                            atividade +
                            "?"
                        }
                    /> } */}
                </Paper>
            </Stack >
        </form >
    );
}

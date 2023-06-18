import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InsertChartOutlinedRoundedIcon from '@mui/icons-material/InsertChartOutlinedRounded';
import {
    Chip,
    Dialog,
    DialogTitle,
    Fab, Grid, Stack,
    isMuiElement
} from "@mui/material";
import { useEffect, useState } from "react";
import { Button as MuiButton } from '@mui/material'

import { TablePagination, TableSortLabel } from '@mui/material';
import FormularioEndereco from './FormularioEndereco';
import Formulario from './Formulario';
import Item from '../components/Lista/Item';


function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    price: number,
) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    };
}

function createDataPessoa(
    codigo: string,
    tipopessoa: string,
    nome: string,
    cpf: string,
    razaosocial: string,
    cnpj: string,
    telefone: string,
    email: string,
) {
    return {
        codigo,
        tipopessoa,
        nome,
        cpf,
        razaosocial,
        cnpj,
        telefone,
        email,
        enderecos: [
            {
                codigo: new Date().getTime(),
                codigopessoa: codigo,
                tipoendereco: "Residencial",
                endereco: "Rua Tupinambás",
                numero: '163',
                complemento: "",
                bairro: "Jardim Igaçaba",
                cep: "13845-375",
                cidade: "Mogi Guaçu",
                uf: "SP",
            },
            {
                codigo: new Date().getTime(),
                codigopessoa: codigo,
                tipoendereco: "Comercial",
                endereco: "Rua Tupiniquins",
                numero: '276',
                complemento: "casa",
                bairro: "Jardim Igaçaba",
                cep: "13125-345",
                cidade: "Mogi Guaçu",
                uf: "SP",
            },
        ],
    };
}

 function Row(props: { row: ReturnType<typeof createDataPessoa> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    const [exibirLoad, setExibirLoad] = useState(false);
    const [mensagemLoad, setMensagemLoad] = useState("");
    const [records, setRecords] = useState<any[]>([]);
    const [oldValues, setOldValues] = useState<any[]>([]);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [message, setMessage] = useState("");
    const [openPopup, setOpenPopup] = useState(false);
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

    // const openInPopup = (e: any, item: any) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     setRecordForEdit(item);
    //     setOpenPopup(true);

    // };

    useEffect(() => {
        console.log("Dados recebidos.", records)
    }, [records])

    // const addOrEditPessoa = (item: any, isAlterar: boolean) => {
    //     let atualizacao = records.map((x: any) => {
    //         return x.codigo === item.codigo
    //             ? item : x
    //     });
    //     if (isAlterar) {
    //         setRecordsPessoa([...records, { ...item, codigo: new Date().getTime() }]);
    //         setRecordForEdit(null);
    //         setOpenPopup(false);
    //         setNotify({
    //             isOpen: true,
    //             message,
    //             type: "success",
    //         });
    //     } else {
    //         setRecords(atualizacao);
    //         setRecordForEdit(null);
    //         setOpenPopup(false);
    //         setNotify({
    //             isOpen: true,
    //             message: "Alterado com sucesso.",
    //             type: "success",
    //         });
    //     }

    //  };

    // const onDelete = (codigo: any) => {

    //     let novosItens = records.filter(
    //         (x: any) => x.codigo !== codigo
    //     )
    //     setRecords(novosItens);


    //     setNotify({
    //         isOpen: true,
    //         message: "Excluído com sucesso!",
    //         type: "success",
    //     });
    //     setExibirModalConfirmacao(false);

    // };

    // function handlExcluir(codigo: any) {
    //     setExibirModalConfirmacao(false);
    //     onDelete(codigo);
    // }

    // function handleAbrirConfirmacao() {
    //     setExibirModalConfirmacao(true);
    // }

    // function handleSituacao(codigo: any) {
    //     setCodigoExcluir(codigo)
    // }

    // /** Função que verifica se houve mudança nos campos */

    // function compareObjects(objA: any, objB: any) {
    //     let objAKeys = Object.keys(objA);
    //     return objAKeys.filter((key) => objA[key] !== objB[key]);
    // }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.tipopessoa}
                </TableCell>
                <TableCell>{row.nome}</TableCell>
                <TableCell>{row.cpf}</TableCell>
                <TableCell>{row.razaosocial}</TableCell>
                <TableCell>{row.cnpj}</TableCell>
                <TableCell>{row.telefone}</TableCell>
                <TableCell>{row.email}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Endereços
                            </Typography>
                            <Table size="small" aria-label="purchases">
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
                                    {row.enderecos.map((EnderecoRow: any, index: any) => (
                                        <TableRow key={EnderecoRow.index}>
                                            <TableCell component="th" scope="row">
                                                {EnderecoRow.tipoendereco}
                                            </TableCell>
                                            <TableCell>{EnderecoRow.endereco}</TableCell>
                                            <TableCell>{EnderecoRow.numero}</TableCell>
                                            <TableCell>{EnderecoRow.complemento}</TableCell>
                                            <TableCell>{EnderecoRow.bairro}</TableCell>
                                            <TableCell>{EnderecoRow.cep}</TableCell>
                                            <TableCell>{EnderecoRow.cidade}</TableCell>
                                            <TableCell>{EnderecoRow.uf}</TableCell>
                                            <TableCell>
                                                {/* <MuiButton
                                                    onClick={(e: any) => {
                                                        openInPopup(e, EnderecoRow);
                                                        setPopupTitle("Alterar Cadastro");
                                                    }}
                                                >

                                                    <EditOutlinedIcon fontSize="small" />

                                                </MuiButton>
                                                <MuiButton
                                                    onClick={(e: any) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setCodigoExcluir(EnderecoRow.codigo);
                                                        onDelete(EnderecoRow.index)
                                                    }} >

                                                    <DeleteIcon fontSize="small" />
                                                </MuiButton> */}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            {/* <Dialog
                sx={{
                    "& .MuiPaper-root": { minHeight: "10%", minWidth: "30%" },
                }}
                open={openPopup}
                onClose={setOpenPopup}
                title={popupTitle}
            >
                <DialogTitle>
                    {"Formulário de Endereços"}
                </DialogTitle>
                <FormularioEndereco
                    setOpenPopup={setOpenPopup}
                    addOrEdit={addOrEdit}
                    recordForEdit={recordForEdit}

                />
            </Dialog> */}
        </React.Fragment>
    );
}

const rows = [
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

const rows2 = [
    createDataPessoa(
        new Date().getTime().toString(),
        "Física",
        "Marlon Siqueira",
        "340.875.788-79",
        "",
        "",
        "(11)98899-6004",
        "siqueira.marlon@gmail.com"
    ),
    createDataPessoa(
        new Date().getTime().toString(),
        "Jurídica",
        "Odair Sousa",
        "321.748.896-74",
        "",
        "",
        "(11)97485-8485",
        "odair.sousa@gmail.com"
    ),
    // createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    // createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    // createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    // createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable() {
    const [exibirLoad, setExibirLoad] = useState(false);
    const [mensagemLoad, setMensagemLoad] = useState("");
    const [recordsPessoas, setRecordsPessoas] = useState<any[]>([]);
    const [oldValuesPessoas, setOldValuesPessoas] = useState<any[]>([]);
    const [recordForEditPessoas, setRecordForEditPessoas] = useState(null);
    const [message, setMessage] = useState("");
    const [openPopupPessoas, setOpenPopupPessoas] = useState(false);
    const [popupTitlePessoas, setPopupTitlePessoas] = useState("");
    const [exibirModalConfirmacao, setExibirModalConfirmacao] = useState(false);
    const [codigoExcluirPessoas, setCodigoExcluirPessoas] = useState("");
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

    function carregaCadastroPessoas(response: any) {
        setRecordsPessoas(response)
        setOldValuesPessoas(response)
    }



    function validateDate() {

        if (recordsPessoas.length === 0) {
            return false;
        }
        return true;
    }

    const openInPopupPessoas = (e: any, item: any) => {
        e.preventDefaultPessoas();
        e.stopPropagationPessoas();
        setRecordForEditPessoas(item);
        setOpenPopupPessoas(true);

    };

    useEffect(() => {
        console.log("Dados recebidos.", recordsPessoas)
    }, [recordsPessoas])

    const addOrEditPessoas = (item: any, isAlterar: boolean) => {
        let atualizacao = recordsPessoas.map((x: any) => {
            return x.codigo === item.codigo
                ? item : x
        });
        if (isAlterar) {
            setRecordsPessoas([...recordsPessoas, { ...item, codigo: new Date().getTime() }]);
            setRecordForEditPessoas(null);
            setOpenPopupPessoas(false);
            setNotify({
                isOpen: true,
                message,
                type: "success",
            });
        } else {
            setRecordsPessoas(atualizacao);
            setRecordForEditPessoas(null);
            setOpenPopupPessoas(false);
            setNotify({
                isOpen: true,
                message: "Alterado com sucesso.",
                type: "success",
            });
        }

    };

    const onDelete = (codigo: any) => {

        let novosItens = recordsPessoas.filter(
            (x: any) => x.codigo !== codigo
        )
        setRecordsPessoas(novosItens);


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
        setCodigoExcluirPessoas(codigo)
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
                                Cadastro de Pessoas
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
                                disabled={recordsPessoas.length >= 5}
                                onClick={(e: any) => {
                                    setOpenPopupPessoas(true);
                                    setRecordForEditPessoas(null);
                                    setPopupTitlePessoas("Adicionar Pessoas");
                                    setMessage("Cadastro realizada com sucesso.");
                                }}
                            >
                                <AddCircleOutlineIcon sx={{ mr: 1 }} />
                                Cadastrar Pessoa
                            </Fab>
                        </Stack>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Tipo Pessoa</TableCell>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>CPF</TableCell>
                                        <TableCell>Razão Social</TableCell>
                                        <TableCell>CNPJ</TableCell>
                                        <TableCell>Telefone</TableCell>
                                        <TableCell>E-mail</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {recordsPessoas.map(
                                        (row: any, index: any) => (
                                            <Row key={row.index} row={row.codigo} />
                                        ))} */}
                                    {rows2.map((row) => (
                                        <Row key={row.codigo} row={row} />
                                    ))}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                    <Dialog
                        sx={{
                            "& .MuiPaper-root": { minHeight: "10%", minWidth: "30%" },
                        }}
                        open={openPopupPessoas}
                        onClose={setOpenPopupPessoas}
                        title={popupTitlePessoas}
                    >
                        <DialogTitle>
                            {"Pessoa"}
                        </DialogTitle>
                        <Formulario
                            setOpenPopup={setOpenPopupPessoas}
                            addOrEdit={addOrEditPessoas}
                            recordForEdit={recordForEditPessoas}

                        />
                    </Dialog>
                </Paper>
            </Stack>
        </form>
    );
}
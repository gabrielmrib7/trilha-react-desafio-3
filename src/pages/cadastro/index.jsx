import { useNavigate  } from "react-router-dom";
import { MdContacts, MdEmail, MdLock, MdPerson } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { useForm } from "react-hook-form";


import { Container, Title, Column, TitleLogin, SubtitleLogin, EsqueciText, CriarText, Row, Wrapper, TenhoConta } from './styles';

const schema = yup
  .object({
    nome: yup.string().required('Nome não pode ficar vazio'),
    email: yup.string().email('Email não é valido').required('Email não pode ficar vazio'),
    senha: yup.string().min(3, 'Minimo 3 caracteres').required('Senha não pode ficar vazia'),
  })
  .required()


const Cadastro = () => {
    const navigate = useNavigate()

    const handleClickSignIn = () => {
        navigate('/login')
      }

    const { control, handleSubmit, formState: { errors  } } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: 'onSubmit',
        mode: 'onSubmit',
    });

    const onSubmit = async (formData) => {
        try {
            const { data } = await api.post('/users', {name: formData.nome, email: formData.email, senha: formData.senha});
            navigate('/login');
            alert('Sucesso!');
        } catch (error) {
            alert('Houve um erro');
            
        }
    };
    

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleLogin>Começe agora grátis</TitleLogin>
                <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="Nome completo" errorMessage={errors?.nome?.message} leftIcon={<MdPerson />} name="nome"  control={control} />
                
                    <Input placeholder="E-mail" errorMessage={errors?.email?.message} leftIcon={<MdEmail />} name="email"  control={control} />
                    
                    <Input type="password" errorMessage={errors?.senha?.message} placeholder="Senha" leftIcon={<MdLock />}  name="senha" control={control} />
                    
                    <Button title="Cadastrar" variant="secondary" type="submit"/>
                </form>
                
                <Column>
                
                <SubtitleLogin>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</SubtitleLogin>
                    <Row>
                        <TenhoConta>Ja tenho conta.</TenhoConta><CriarText onClick={handleClickSignIn}>Fazer Login</CriarText>
                    </Row>
                
                </Column>
                </Wrapper>
                
            </Column>
        </Container>
    </>)
}

export { Cadastro }
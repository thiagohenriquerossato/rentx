# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro.

**RNF**

**RN**
Não deve ser possível cadastrar novo carro com uma placa ja existente.
Não deve ser possível alterar placa de um carro ja cadastrado.
O carro deve ser cadastrado com disponibilidade por padrão.
Nao deve ser possível cadastro de carro por usuário nao adminstrador.

# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
Não é necessario estar logado para listar.

# Cadastro de especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação ja existente para o mesmo carro.
Nao deve ser possível cadastro de especificação por usuário nao adminstrador.

# Cadastro de imagens no carro

**RF**  
Deve ser possivel cadastrar a imagem do carro.
Deve ser possivel listar todos os carros.

**RN**
O usuario deve poder cadastrar mais de uma imagem para o mesmo carro
Nao deve ser possível cadastro de especificação por usuário nao adminstrador.

# Aluguel de carro

**RF**
Deve ser possivel cadastrar um aluguel
**RN**
O aluguel deve ter duração minima de 24 horas
Não deve ser possivel cadastrar um novo aluguel caso ja exista um em aberto para o mesmo usuario
Não deve ser possivel cadastrar um novo aluguel caso ja exista um em aberto para o mesmo carro

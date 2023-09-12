class Produto {
    constructor() {
        this.id = 1
        this.arrayProdutos = []
        this.editId = null
    }
    salvar() {
        let produto = this.lerDados()

        if (this.validaCampos(produto)) {
            if(this.editId == null){
                this.adicionar(produto)
            } else {
                this.atualizar(this.editId, produto)
            }   
        }

        this.listaTabela()
        this.cancelar()
    }

    listaTabela() {
        let tbody = document.getElementById('tbody')
        tbody.innerText = ''

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow()

            let td_id = tr.insertCell()
            let td_produto = tr.insertCell()
            let td_valor = tr.insertCell()
            let td_acoes = tr.insertCell()

            td_id.innerText = this.arrayProdutos[i].id
            td_produto.innerText = this.arrayProdutos[i].nomeProduto
            td_valor.innerText = this.arrayProdutos[i].preco

            td_id.classList.add('center')

            let imgEdit = document.createElement('img')
            imgEdit.src = 'assets/editar.png'
            imgEdit.setAttribute("onclick", "produto.editar(" + JSON.stringify(this.arrayProdutos[i]) + ")")

            let imgDelete = document.createElement('img')
            imgDelete.src = 'assets/botao-apagar.png'
            imgDelete.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")")

            td_acoes.appendChild(imgEdit)
            td_acoes.appendChild(imgDelete)

            td_acoes.classList.add('center')
            console.log(this.arrayProdutos)
        }
    }

    adicionar(produto) {
        this.arrayProdutos.push(produto)
        this.preco = parseFloat(produto.preco)
        this.id++
    }

    atualizar(id, produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto
                this.arrayProdutos[i].preco = produto.preco
            }
        }
    }

    editar(dados) {
        this.editId = dados.id

        document.getElementById("produto").value = dados.nomeProduto
        document.getElementById("preco").value = dados.preco

        document.getElementById("btn1").innerText = "Atualizar"
    }

    lerDados() {
        let produto = {}

        produto.id = this.id
        produto.nomeProduto = document.getElementById("produto").value
        produto.preco = document.getElementById("preco").value

        return produto
    }

    validaCampos(produto) {
        let msg = ''

        if (produto.nomeProduto == '') {
            msg += "- INFORME O NOME DO PRODUTO \n"
        }
        if (produto.preco == '') {
            msg += "- INFORME O PREÇO DO PRODUTO \n"
        }
        if (msg != '') {
            alert(msg)
            return false
        }
        return true
    }

    cancelar() {
        produto.nomeProduto = document.getElementById("produto").value = ''
        produto.nomeProduto = document.getElementById("preco").value = ''

        document.getElementById("btn1").value = "salvar"
        this.editId = null
    }

    deletar(id) {

        if (confirm("Deseja realmente deelatar o produto do ID  " + id)) {
            let tbody = document.getElementById('tbody')


            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1)
                    tbody.deleteRow(i)
                }
            }
            console.log(this.arrayProdutos)
        }
    }
}

var produto = new Produto()
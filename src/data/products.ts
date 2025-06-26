import type { Product } from "../types/Product";
import notebookImage from "../assets/notebook.png";
import smartphoneImage from "../assets/smartphone.png";
import camisetaImage from "../assets/camiseta.png";
import jeansImage from "../assets/jeans.png";
import headphoneImage from "../assets/headphone.png";
import cadeiraImage from "../assets/cadeira.png";
import luminariaImage from "../assets/luminaria.png";
import hobbitImage from "../assets/hobbit.png";
import guiaMochileiroImage from "../assets/guia-mochileiro.png";
import tenisImage from "../assets/tenis.png";
import monitorImage from "../assets/monitor.png";
import cafeteiraImage from "../assets/cafeteira.png";
import halteresImage from "../assets/halteres.png";
import dunaImage from "../assets/duna.png";
import tapeteYogaImage from "../assets/tapete-yoga.png";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Notebook Pro X1",
    category: "Eletrônicos",
    price: 5999.9,
    imageUrl: notebookImage,
    description:
      "Um notebook de alta performance com processador de última geração, 16GB de RAM e SSD de 512GB. Ideal para trabalho e jogos.",
  },
  {
    id: 2,
    name: "Smartphone Galaxy Z",
    category: "Eletrônicos",
    price: 3250.0,
    imageUrl: smartphoneImage,
    description:
      "Câmera tripla de alta resolução, tela AMOLED de 6.7 polegadas e bateria de longa duração para o dia todo.",
  },
  {
    id: 3,
    name: "Camiseta Básica Premium",
    category: "Vestuário",
    price: 89.99,
    imageUrl: camisetaImage,
    description:
      "100% algodão pima peruano, oferece conforto superior e um caimento perfeito para qualquer ocasião.",
  },
  {
    id: 4,
    name: "Calça Jeans Slim",
    category: "Vestuário",
    price: 189.9,
    imageUrl: jeansImage,
    description:
      "Design moderno e tecido com elastano para maior conforto e liberdade de movimento.",
  },
  {
    id: 5,
    name: "Headphone Bluetooth Bass",
    category: "Eletrônicos",
    price: 349.5,
    imageUrl: headphoneImage,
    description:
      "Fone de ouvido sem fio com cancelamento de ruído ativo e graves potentes. Bateria com autonomia para 20 horas.",
  },
  {
    id: 6,
    name: "Cadeira de Escritório Ergo",
    category: "Casa",
    price: 899.0,
    imageUrl: cadeiraImage,
    description:
      "Cadeira ergonômica com suporte lombar ajustável, braços reguláveis e encosto em tela para melhor ventilação.",
  },
  {
    id: 7,
    name: "Luminária de Mesa LED",
    category: "Casa",
    price: 129.9,
    imageUrl: luminariaImage,
    description:
      "Design minimalista com braço flexível e controle de intensidade e temperatura da luz.",
  },
  {
    id: 8,
    name: "O Hobbit",
    category: "Livros",
    price: 45.0,
    imageUrl: hobbitImage,
    description:
      "A clássica aventura de J.R.R. Tolkien que precede a trilogia de O Senhor dos Anéis. Edição com capa dura.",
  },
  {
    id: 9,
    name: "O Guia do Mochileiro das Galáxias",
    category: "Livros",
    price: 55.9,
    imageUrl: guiaMochileiroImage,
    description:
      "O primeiro livro da aclamada e hilária série de ficção científica de Douglas Adams. Edição definitiva.",
  },
  {
    id: 10,
    name: "Tênis de Corrida Runner",
    category: "Vestuário",
    price: 450.0,
    imageUrl: tenisImage,
    description:
      "Tênis leve com amortecimento de alta resposta, ideal para treinos diários e corridas de longa distância.",
  },
  {
    id: 11,
    name: 'Monitor Gamer UltraWide 29"',
    category: "Eletrônicos",
    price: 1850.0,
    imageUrl: monitorImage,
    description:
      "Monitor com proporção 21:9 para uma visão de jogo imersiva e taxa de atualização de 144Hz.",
  },
  {
    id: 12,
    name: "Cafeteira Expressa Automática",
    category: "Casa",
    price: 680.0,
    imageUrl: cafeteiraImage,
    description:
      "Prepare cafés expressos, cappuccinos e lattes com o toque de um botão. Inclui moedor de grãos integrado.",
  },
  {
    id: 13,
    name: "Halteres Ajustáveis (Par)",
    category: "Esportes",
    price: 550.0,
    imageUrl: halteresImage,
    description:
      "Par de halteres com sistema de seleção de peso, variando de 2.5kg a 24kg. Economize espaço e diversifique seu treino.",
  },
  {
    id: 14,
    name: "Duna - Frank Herbert",
    category: "Livros",
    price: 89.9,
    imageUrl: dunaImage,
    description:
      "A obra-prima da ficção científica que deu origem a um universo vasto e complexo. Edição de luxo.",
  },
  {
    id: 15,
    name: "Tapete de Yoga Pro",
    category: "Esportes",
    price: 220.0,
    imageUrl: tapeteYogaImage,
    description:
      "Feito de material ecológico e antiderrapante, oferece a aderência e o conforto necessários para sua prática.",
  },
];

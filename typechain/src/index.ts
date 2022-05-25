//deClaration files
// 패키지를 수동으로 가리키다

// import {init, exit} from "myPackage";

// init({
//     url: "true" 
// })

// exit(1) // 오오오..이 앞 숫자 있다..

// 블록체인 만들어보기

// 애를 이용해 해쉬값을 만들어 보자
import crypto from "crypto"
// 임포트 에러가 나면 npm i -D @types-node를 설치해보자

interface BlockShape {
    hash: string
    prevHash: string
    height: number
    data: string
}

class Block implements BlockShape{
    public hash: string //해쉬는 3개의 값이 하나로 뭉쳐 이상한 문자열을 만든다
    constructor (
        public prevHash: string,
        public height: number,
        public data: string
    ) {
        this.hash = Block.calculateHash(prevHash, height, data);
    }
    static calculateHash(prevHash:string, height: number, data: string)
    { //string으로 받아야 되는데, 타입이 void이다 => 바꿔야됨
        const toHash = `${prevHash} ${height} ${data}` //해쉬 값
        return crypto.createHash("sha256").update(toHash).digest("hex");
    }
}

class BlockChain {
    private blocks: Block[]
    constructor () {
        this.blocks = [];
    }
    // 블럭을 생성하기 위해 hash 값을 불러오기
    private getPrevHash(){
        if(this.blocks.length === 0) return ""; //hash가 없다면
        return this.blocks[this.blocks.length - 1].hash // 마지막 해쉬를 리턴
    }
    public addBlock(data:string) {
        //새 블럭 생성
        const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data) 
        //생성한 블럭을 blocks 배열에 넣어주기
        this.blocks.push(newBlock);
    }
    // 블럭에 접근할수 있는 함수
    public getBlocks() {
        //return this.blocks; 
        //위 코드는 보안이 되지 않는다, 그래서 새로운 배열을 리턴해주자
        return [...this.blocks];
    }   
}

const blockchain = new BlockChain();

blockchain.addBlock("first");
blockchain.addBlock("second");
blockchain.addBlock("third");
blockchain.addBlock("fourth");

blockchain.getBlocks().push(new Block("xxss", 1441, "AHSS")); //가짜 데이터를 넣어봤지만 출력되지 않음

console.log(blockchain.getBlocks());
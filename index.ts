type Name = string;
type AddOn =  "Zerg" | "Terran" | "Protoss"

type Player = {
  name: Name,
  age?: number,
}

function playmad(name:string) : Player {
  return {
    name
  }
}

const nico = playmad("nico");
nico.age = 12;


const kim: Player = {
  name: "nico",
};

const lee: Player = {
  name: "lee",
  age: 9,
};

const names:  string[]= ["1", "2"]
names.push('2')

// ㅁ친 ㅅㅂ 혁명이네, ?로 넣을지 안 넣을 지 옵션을 넣었다
// readonl => 쓰면 수정이 불가능하다
// Tuple => array를 가져오는 데 최소한의 길이가 필요함, 
// 특정 위치에 특정 타입이 있어야 함
// 굉장히 잘 쓸거 같은데, 어디에 쓰지?
//항상 정해진 갯수의 요소를 가져야 하는 array를 지정할수 있다! 를 기억하자
const player: [string, number, boolean] =["me", 12, true]
player[1] = 3

// any => 비어있는 값을 쓰면 any가 된다, 아무 타입이나 될 수 있음
// 보안 체계를 어지럽게 하기 때문에 자주 쓰면 안된다
let a = []



// unknown => 선언하면 일종의 보호를 받게 되는데, 
//작업을 하려면 이 변수의 타입을 먼저 확인해야 하는 방식

let b: unknown;
if( typeof b === 'number') { // 그냥 if문으로 확인하는구나
  let c = b + 1
}

if(typeof b === "string") {
  let c = b.toLowerCase();
}


//void => 아무것도 리턴하지 않는 함수를 대상으로 사용한다
function hello() {
  console.log("11")
}

//never => 함수가 절대 return 하지 않을때 발생한다
function hi(): never{
 throw new Error("xxx") // error를 발생시키는 함수
}

function hi2(name:string|number) {
  if(typeof name === "string"){

  } else if (typeof name === "number"){

  } else{
    name //오 ㅋㅋㅋ 할당하지 않으니까 never로 나옴
  }
}

// call signature 일단 복습
type Add = (a:number, b:number) => number; 
// type을 선언하고 그 코드를 다시 쓸 수 있다
const add:Add = (a,b) => a + b

/*  overloading 
함수가 "서로 다른 여러 개"의 call signatures를 가지고 있을 때 발생시킨다
*/

type Divide = {
  (a:number, b:number) : number
  (a:number, b:string) : number // 이상한 예를 들었다, 한 변수가 string을 리턴함
}

const divide: Divide = (a,b) => {
  if(typeof b === "string") return a
  return a+b
  //여기서 b가 string이기 때문에 확인시키고 a를 리턴
}

// 다른 예를 들어보자

//예시 1: 파라미터가 같은 갯수 일때
type Config = {
  path: string,
  state: object
}

type Push = {
  (path: string): void
  (config: Config): void
}

const push: Push = (config) => {
  if( typeof config === "string") { console.log(config)} 
  else {
    console.log(config.path) // 출력을 string인지 확인하고, 
  }
}

//예시 2: 파라미터가 서로 다른 숫자일때 
type Sub = {
  (a:number, b:number) : number
  (a:number, b:number, c:number) : number,
}

const sub:Sub = (a, b, c?:number) => { 
  //c는 선택사항이고 추가적으로 타입을 줘야함, 옵션으로 넣어서 
  if(c) return a + b + c
  return a + b
}

//작동함
sub(1, 2)
sub(1, 2, 3)

//근데 예시 1을 많이 볼 일이 많을 거다



// polimorphism 다형성 => 다양한 구조, 모양 등
type SuperPrint = {
  //generic 선언  <T> => call signature가 generic을 받는 걸 알려준다
  <T>(arr: T[] ):void
}

const superPrint: SuperPrint = (arr) => {
  arr.forEach(i => console.log(i))
}

superPrint([1, 2, 3, 4])
superPrint([true, false, true])
superPrint(["a", "b", "c"]) 
superPrint([1, 2, true, false]) 
superPrint(["1", 2, true, false]) 
// 문자열을 주면 오류가 난다 
//그렇다면 SuperPrint에 string으로 된 arr를 줘야 할까?
// generic을 사용해서 해결해보자 => 타입의 placeholder같은 것?
// 첫째: 타입스크립트에 generic을 사용하고 싶다고 얄려줘야 한다


// 객체 지향

// 추상 클래스에 넣기 Abstract Class
// 추상 클래스는 다른 클래슥 ㅏ상속받을 수 있는 클래스다
abstract class User {
    constructor(
      private firstName: string,
      private lastName: string,
      public nickname: string
      ) {}
      //추상 메소드는 추상 클래스를 상속받는 모든것들을 구현해야 하는 메소드
      // 구현이 안되어 있다
      abstract getNickName(): void

      // method 메소드 만들기
      protected getFullName() {
        return `${this.firstName} ${this.lastName}`
      }

  }

class Players extends User{
  getNickName(): void {
    console.log(this.nickname)
  }
} 

  const me = new Players("kim", "jeonghoon", "brill")


  //예제
  type Words = {
    //새로운 것 => Words 타입이 string만을 property로 가지는 오브젝트다
    [key:string] : string // 이름은 없고 타입만 알때 이렇게 써보자
  }

  // let dict :Words = {
  //   "potato": "food" //<= key, value 느낌이네
  // }

  class Dict {
    private words: Words
    constructor(){
      this.words ={}
    }

    add(word:Word) {
      if(this.words[word.term] === undefined)
      // 주어진 단어가 아직 사전에 존재하지 않음
      {
        this.words[word.term] = word.def;
      }
    }

    def(term:string) { 
      return this.words[term]
    }

    del(term:string) {
      delete this.words[term] // 이게 진짜 신기한게 delete가 그냥 함수로 있네
    }

    update(word:Word) {
      if(this.words[word.term] !== undefined) {
          this.words[word.term] = word.def;
      }
    }

  }

  class Word {
    constructor(
      public term: string,
      public readonly def: string
    ) {}
  }

  const bin = new Word("bin", "콩이다")
  const dict = new Dict();


  dict.add(bin) //bin을 생성하고
  dict.def("bin") // bin이 있는지 확인 => 콩이다

  dict.update(new Word("bin", "콩인데 길다")) // 새로운 def를 업뎃
  dict.def("bin") // 출력값: 콩인데 길다

  dict.del("bin") // 삭제하는 값
  dict.def("bin") // 출력 값: undefined



//interface => 한 가지의 용도로만 쓰인다, 오브젝트의 모양을 특정해주기 위해??
// type을 선언하는 것과 비슷하다. 모양을 만드는데 type과 interface로 쓰자
type U = {
  name: string,
  age: number
}

const kyu : U = {
  name: "kyuSang",
  age: 39
}
//-------------------
interface Y {
  name: string,
  age: number
}

//예제
interface Wizard {
  name: string
}

interface Soldier extends Wizard {
    
}

const ee : Soldier = {
  name: "nico"
}

// interface part 2

//Sheild 추상 클래스랑 Reddy 클래스를 구현
abstract class Sheild {
  constructor (
    protected firstName: string,
    protected lastName: string,
  ) {}
  //이 추상 클래스가 두 개의 메소드를 가지도록 할거임 ㅇㅇ
  abstract sayHi(name:string):string
  abstract fullName():string
}
// 추상화는 인스턴스를 만들 수 없다
//예: const us = new Sheild();

// 위의 클래스를 상속받으면 sayHi와 fullName을 무조건 써야됨
class Reddy extends Sheild {
  fullName() {
      return `${this.firstName} ${this.lastName}`
    }
    sayHi(name: string): string {
      return `Hello ${name}. My name is ${this.fullName()}`
    }
  
}

// 이것의 문제점: abstract은 js로 변환하면 그냥 class로 인식된다
// 그래서 interface를 써서 사라지지 않게 할 수 있다

interface Sheild2 {
    firstName: string,
    lastName: string,
    sayHi(name:string):string,
    fullName():string,
}
class Reddy2 implements Sheild2 { //implements는 js에 존재하지 않는다
 constructor(
  public firstName: string,
  public lastName: string,
 ){}
 fullName() {
  return `${this.firstName} ${this.lastName}`
  }
  sayHi(name: string): string {
  return `Hello ${name}. My name is ${this.fullName()}`
  }
}

// 파일 사이즈를 줄이고 싶다면, 이렇게 써보자



// 현재 배운 걸 다 합쳐보기 => 다형성, 제네릭, 클래스, 인터페이스
interface SStorage<T> {
  [key:string] : T
}

class LocalStorage<T> { //generic <T> 추가
  private storage: SStorage<T> = {} // interface 기준으로 받음
  set(key: string, value:T) {
    //key, value를 storage에 저장
    this.storage[key] = value;

  }
  remove(key:string) {
    delete this.storage[key]
  }

  get(key: string): T {
    return this.storage[key]
  }

  clear() {
    this.storage = {}
  }
}

// 생성
const stringStorage = new LocalStorage<string>()

stringStorage.get("kid")

const booleanStorage = new LocalStorage<boolean>();

booleanStorage.get("xx")
booleanStorage.set("real",false)
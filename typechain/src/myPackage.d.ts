interface Config {
    url: string;
}
// 타입스크립이 타입을 알려주고 있다. 모듈을 써서 외부에 쓸 수 있음
declare module "myPackage" {
    function init (config:Config) :boolean
    function exit (code: number) : number
}
//========================= INTRO =========================
// const a = "1";
// console.log("aaa", a);

//========================= VARIABLES =========================
//1)
// const hello = "TypeScript"; //TypeScript is the type...not String
// hello = "test"; //results in error..cannot reassign a constant

//2)
// let hello = "typeScript"; //type is a String there can be reassigned
// hello = "foo"; //can change value because its a string
// hello = true; //results in error because can only change to same data type

//3)
// let hello: string = "typescript"; //specifying the type


//========================= FUNCTIONS =========================
// const getFullName = (name: string, surname: string): string => {
//     return name + " " + surname;
// };
// console.log(getFullName("Bhabha", "September"));


//========================= INTERFACES =========================
//1) Creating Objects
// const user: {name: string, age: number} = {
//     name: "Bhabha",
//     age: 30
// }

// const user2: {name: string, age: number} = { //will get error for missing age property
//     name: "Tracy",
// }

//2) Avoid repetition by creating interfaces
// interface User {
//     name: string;
//     age: number;
// }
// const user3: User = { //we are getting type User not object as before
//     name: "Samuel",
//     age: 28
// }

//3) To make some properties not manadatory
// interface UserInterface {
//     name: string,
//     age?: string //'?' makes age not mandatory/required
//     getMessage(): string
// }
// const user4: UserInterface = {
//     name: "Jarod",
//     getMessage() {
//         return "Hello" + name;
//     },
// }

// //typescript allows autocomplete and typecheck (for typos)
// console.log(user4.age);


//========================= TYPES & UNIONS =========================
//Custom types/ type aliases
// type ID = string
// type PopularTag = string;
// type MaybePopularTag = PopularTag | null; //combining type aliases and union

// interface UserInterface {
//     id: ID; //(could have used 'id: string' but using alias is nice clearer code)
//     name: string;
//     surname: string;
// }

// const popularTags: PopularTag[] = ["reboost", "turbo"];

// const reboostTag: MaybePopularTag = "reboost";

// let username: string = "Julie";

// let pageName: string | number = "1"; // '|' union operator to combine data types

// let errorMessage: string | null = null; //null is default. if not specified it will be undefined

// let user: UserInterface | null = null;

//========================= ANY / VOID / NEVER / UNKNOWN =========================
// //1) VOID type is undefined and null
// //used to indicate that a function does not return anything
// const doSomething = (): void => { //there was no return statement so it's recommended to specify type void
//     console.log("inside doSomething function");
// };

// //2) ANY type turns off typescript checks
// let foo : any = "I am a string...";
// let foo2: any = 12;
// let foo3: any = false;
// let foo4: any = {name: "Bhabha", age: "30"}
// console.log(foo.bar());

// //3) NEVER type function cannot be executed to the end
// const doSomething = (): never => {
//     throw "never";
// }

//4) UNKNOWN type cannot be assigned directly in other types
// let vAny: any = 10;
// let vUnknown: unknown = 10;

// let s1: string = vAny; //works because of type ANY
// let s2: string = vUnknown; //results in error

// console.log(vAny.foo());
// console.log(vUnknown.foo());//error again

//TYPE ASSERTION
// let s3: string = vUnknown as string; 

// let pageNumber: string = "1";
// let numericPageNumber: number = (pageNumber as unknown) as number;


//========================= WORKING WITH DOM =========================
//1)
// const someElement = document.querySelector(".foo");
// console.log("Some Element: ", someElement.value); //error because 'value' is not a property of 'element' 

//2)
// const someElement = document.querySelector(".foo");
// console.log("Some Element: ", (someElement as any).value); //gets rid of error but is not recommended

//3)
// const someElement = document.querySelector(".foo") as HTMLInputElement; //recommended approach because input elements do have 'value' property
// console.log("Some Element: ", someElement.value);

//4) 
// const someElement = document.querySelector(".foo");
// someElement.addEventListener("blur", (event) => {
//     const target = event.target as HTMLInputElement;
//     console.log("Event: ", target.value);
// })


//========================= CLASSES =========================
//1)
//private : only visible inside class, cannot be used outside of class
//protected: useable by class and its children i.e. inheritance
//readonly similar to const
// class User {
//     protected firstName: string;
//     private lastName: string;
//     readonly unchangableName: string;

//     constructor(firstName: string, lastName: string) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.unchangableName = firstName;
//     }

//     // changeUnchangableName(): void {
//     //     this.unchangableName = "foo"; //error occurs because this is readonly 
//     // }

//     getFullName(): string {
//         return this.firstName + " " + this.lastName
//     }
// }

// const user = new User("Bhabha", "September");
// console.log(user)

//2)
// interface UserInterface {
//     getFullName(): string;
// }

// class User implements UserInterface {
//     firstName: string;
//     lastName: string;
//     readonly unchangableName: string;
//     static readonly maxAge = 18; //static properties are accessible only on the class itself

//     constructor(firstName: string, lastName: string) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.unchangableName = firstName;
//     }

//     getFullName(): string {
//         return this.firstName + " " + this.lastName
//     }
// }

// const user = new User("Bhabha", "September");
// console.log(user.getFullName);
// console.log(User.maxAge); //static property only accessible by class and not instances of the class

// //Inheritance
// class Admin extends User {
//     private editor: string;

//     setEditor(editor: string): void {
//         this.editor = editor
//     }

//     getEditor(): string {
//         return this.editor

//     }

// }

// const admin = new Admin("Tracy", "Ndlovu");
// console.log(admin.firstName);
// console.log(admin.getEditor);

//========================= GENERICS IN TYPESCRIPT =========================
//1) Generic <T> means we can provide any different data type 
// const addId = <T>(obj: T) => { //generic data type 'T' 
//     const id = Math.random().toString(16);

//     return {
//         ...obj, //spread all properties of object argument
//         id
//     }
// }
// const user = {
//     name: "Timmy"
// }
// const result = addId(user)
// console.log("Result: ", result);

//2)
// const addId = <T extends object>(obj: T) => { //setting default data type
//     const id = Math.random().toString(16);

//     return {
//         ...obj, //spread all properties of object argument
//         id
//     }
// }
// interface UserInterface {
//     name: string;
// }
// const user: UserInterface = {
//     name: "Timmy"
// }
// const result = addId<UserInterface>(user); //explicitly declaring to typescript that 'UserInterface' is generic data type
// // const result2 = addId<string>("error"); //error, string does not satisfy constraint
// // const result3 = addId<UserInterface>("error") //error, type string not assignable to UserInterface
// console.log("Result: ", result);

//3) Generics with Interfaces
// const addId = <T extends object>(obj: T) => { 
//         const id = Math.random().toString(16);

//         return {
//             ...obj, 
//             id
//         }
//     };


//     interface UserInterface<T, V> { //data Type T is generic so we can set it to whatever type as needed?
//         name: string;
//         data: T; 
//         meta: V;

//     };

//     const user: UserInterface<{meta: string}, string> = { 
//         name: "Timmy",
//         data: {
//             meta: "foo",
//         },
//         meta: "someString"
//     };

//     // const user2: UserInterface<string[]> = {
//     //     name: "Nolan",
//     //     data: ["foo", "bar", "array"],
//     // };

//==========================================================
// //EXAMPLE 1: how to read the below function
// //export function append<T>(el: T, list: readonly T[]): T[];
// const updatedArray = append<string>("Element to append to", ["Array", "Of", "Elements"]);

// //EXAMPLE 2:
// //export function any<T>(fn: (a: T) => boolean, list: readonly T[]): boolean;
// const searchStr = "foo";
// const hasSearchedString = any<string>((el: string) => el.contains(searchStr), ["foooo", "bar", "baz"])

//========================= ENUMS IN TYPESCRIPT =========================
//1)
// const statuses = {
//     notStarted: 0,
//     inProgress: 1,
//     done: 2
// }
// console.log(statuses.inProgress);

//2)
// // below same as above but using enumerables
// // values are incremented from 0
// // Main benefit is that enums can be used as a value and data type
// enum Status {
//     NotStarted, 
//     InProgress,
//     Done
// }
// console.log(Status.InProgress);

// let notStartedStatus: Status = Status.NotStarted; //enums used as a data type and value as well
//notStartedStatus = "foo"; //error can only assign available Statuses
// notStartedStatus = Status.Done;
// console.log(Status.InProgress);



//3) assigning values that are understandable instead of having numbers 
// enum Status {
//     NotStarted = "notStarted", 
//     InProgress = "inProgress",
//     Done = "done"
// }
// console.log(Status.InProgress);

//4)
// enum StatusEnum {
//     NotStarted = "notStarted", 
//     InProgress = "inProgress",
//     Done = "done"
// }

// interface Task {
//     id: string;
//     status: StatusEnum; //status property of type enum Status
// }
// console.log(StatusEnum.InProgress);
#!/usr/bin/env xcrun swift

//print("The input is:\(Process.arguments[1])");

import Foundation

infix operator <<~ { associativity left }

func <<~ <A,B,C>(g:B->C, f:A->B) -> A -> C {
    return {X in g(f(X))}
}

    
struct Module {
    let variable:String
    let statement:String
    let comment:String?
    
    init(variable:String, statement:String, comment:String?){
        self.variable = variable
        self.statement = statement
        self.comment = comment
    }
}

func addPrefix(prefix:String) -> (String) -> String {
    return {
        x in prefix + x
    }
}

func addPostfix(post:String) -> (String) -> String {
    return {
        x in  x + post
    }
}

func replaceStatementTag(token:String) -> (String) -> String{
    return {
        x in x.stringByReplacingOccurrencesOfString("#TOKEN", withString: token)
    }
}

func captureInput(input:String?) -> String {
    
    switch(input){
    
    case .Some(let consoleIn):
        return consoleIn
    case .None:
        return ""
    }
}

let addVar = addPrefix("var ")
let addEOL = addPostfix(" \n ")
let addEqual = addPostfix(" = ")
let addOpenBraquet = addPrefix("{ \n")
let addCloseBraquet = addPostfix("} \n")
let lhs = addEqual <<~  addVar



let require:[Module] = [Module(variable: "express", statement:"require('express');", comment:nil),
    Module(variable:"router", statement:"express.Router();", comment:nil),
    Module(variable:"bodyParser", statement:"require('body-parser');", comment:nil),
    Module(variable:"parseUrlencoded", statement:"bodyParser.urlencoded({ extended: false });", comment:nil),
    Module(variable:"bookshelf", statement:"equire('../Config/bookshelf');", comment:"//Dependency")]

let test = require.map{
    
    lhs($0.variable) + addEOL($0.statement)
}

//var Discipline = bookshelf.Model.extend({tableName: 'Discipline'});

var statement = "bookshelf.Model.extend({tableName: '#TOKEN'});"
var input = captureInput(Process.arguments[1])
var model = replaceStatementTag(input)


let inputModel = Module(variable:input, statement:model("bookshelf.Model.extend({tableName: '#TOKEN'});"), comment:nil)


print("Test: \(test)")
print("Model: \(inputModel)")


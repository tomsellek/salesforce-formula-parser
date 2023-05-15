Extract identifiers from Salesforce formulas and provide semantic information about them.
Pass a formula to extractFormulaIdentifiers to obtain a list of identifiers used in the formula.
Pass an identifier to parseFormulaIdentifier to receive semantic information about it.

The semantic analysis code is a TypeScript rewrite of the relevant part of the [Forcemula](https://github.com/pgonzaleznetwork/forcemula) package by Pablo Gonzales.

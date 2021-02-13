# Persistr CLI

Command-line interface for Persistr Server and Persistr Cloud

## Installing

Install the Persistr CLI on the command-line:

```
npm install -g @persistr/cli
```

## Getting Started

Run the Persistr CLI:

```
persistr
```

You will get a list of available commands:

```
COMMANDS
  access       manage user access                  
  annotations  manage stream annotations           
  db           manage databases                    
  events       manage events                       
  help         display help                        
  ns           manage namespaces                   
  server       manage connection to Persistr Server
  streams      manage event streams                
  user         login/logout and manage users       
```

View help page for each command by using `help` on the command-line:

```
persistr help db:list
```

Or by using the `-h` or `--help` command-line options:

```
persistr db:list -h
```

```
persistr db:list --help
```

## Logging In

You'll have to tell Persistr CLI where your Persistr Server is located. By default, the CLI will talk to Persistr Cloud. If you have a local Persistr Server instance running then tell the CLI what its location is:

```
persistr server:url http://localhost:3010
```

You can display what Persistr Server your CLI is configured to access by running the `server:show` command:

```
persistr server:show
Persistr Server at http://localhost:3010 
```

Log into Persistr Server by running the `user:login` command:

```
persistr user:login demo
✔ Password? … ****
demo logged in
```

Display which user is logged in with the `user:whoami` command:

```
persistr user:whoami
demo "demo" is logged into Persistr Server at http://localhost:3010 
```


## License

See the [LICENSE](LICENSE) file for license rights and limitations (GPL).

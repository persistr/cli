# Persistr CLI

CLI for interacting with Persistr Server

## Getting Started

Install the Persistr CLI:

```
npm install -g @persistr/cli
```

Run it:

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
  user         login/logout
```

View help page for each command by using `help` on the command line:

```
persistr help db:list
```

Or by using the `-h` or `--help` command line options:

```
persistr db:list -h
```

```
persistr db:list --help
```

# Avax Gods

A (kinda) realtime Web3 multiplayer card game.

This is my approach to the tutorial video made by JSMastery ["Build and Deploy an Online Multiplayer Web 3 NFT Card Game"](https://www.youtube.com/watch?v=C9ctoK4M9Bk) with a few changes:

- **Vue instead of React** as the UI framework. I used Vue because I'm more experienced with it and the tools and ecosystem around it, also I feel more confident using it as well as more productive, and I like the concepts and the "Vue way" of doing things more than React.
- **Typescript**. I used TS because it lets me add type safety to the code and components without getting in the way. Also getting autocompletion everywhere is pretty nice.
- **Layouts instead of HOCs**. I used layouts to create reusable views instead od using Higher Order Components, because I like this approach better as it seems more elegant and concise, although HOCs are more flexible and customizable. Also, as I used [Vitesse](https://github.com/antfu/vitesse) as starter template, use of layouts is already present, so I didn't have to configure anything.
- **File based routing**. Each `.vue` file inside the `src/pages` folder is taken as a page and generated as a route, so I don't have to do it manually, similar to Next or Nuxt frameworks. 
Again, this functionality is already built into [Vitesse](https://github.com/antfu/vitesse) so I didn't have to take care of it.
- **Pinia stores**. I used stores instead of the context API for React (Vue's equivalent is the Provide/Inject mechanism) because they let me share functionality and data (state) across multiple components, but they also allow me to put each piece of common functionality into a single store, thus making the code more organized and maintainable.
- **UnoCSS instead of Tailwind**. [UnoCSS](https://uno.antfu.me/) is a utility CSS engine used as an alternative to Tailwind or Windi CSS with some advantages such as customization, speed, debug tools and presets. It also lets you use CSS icons using only classes and is easy to install and get started (no need to install PostCSS).

Also I added some more useful features to the site and development process:

- **Route guards**. To prevent access to protected routes whe unauthenticated. So the user has to register in the game before he gets access to it. If he tries to access these routes without being authenticated, navigation is aborted and he is redirected to the registration page.
- **CI/CD pipeline to GH pages**. When working in the development of the page, the deployment process is an important step to make the changes available to the world outside of localhost.
To automate this process, I created a workflow using **Github Actions** to build and deploy the project to **Github Pages**. So, when pushing changes to the `main` branch of this repository, a new job is fired and the build and deployment process gets started.



## How to get started

First of all, you will need a Web3 wallet. [Core wallet](https://core.app/) is recommended but you can use any other, such as MetaMask.

### Install Core Wallet

For the purpose of this quickstart guide, Core will be used. You can get the Core extension at their [official page](https://core.app/) or from the [Chrome store](https://chrome.google.com/webstore/detail/core-crypto-nft-wallet-ex/agoakfejjabomempkjlepdflaleeobhb?hl=en-US).

Once installed, this screen will show up:

![](guide/assets/create_wallet.png)

Now, click on ***Create new Wallet***.

**Read** and accept the ToU and Privacy Policy.

Then, give a name to the wallet and create a password. Don't forget to check the ToU and Privacy Policy, and click ***Save***

![](guide/assets/Screenshot_2023-01-05_12-41-09.png)

Next, your recovery phrase. Copy it and store it in a safe place, as advised. You will need it for the next step. Why do you need a recovery phrase? You can read about [here](https://www.skiff.com/blog/wallet-recovery-phrase)

![](guide/assets/Screenshot_2023-01-05_12-44-01.png)

After that, to make sure you have access to your recovery phrase, you will be asked for words that are present in it. Follow the hints and click ***Next***

![](guide/assets/Screenshot_2023-01-05_13-08-06.png)

If everything is OK, you will get a message that wallet has been created.

![](guide/assets/Screenshot_2023-01-05_13-09-35.png)

You can pin the extension for easy access to it.

If you click on the Core icon (that little owl) you should get something like this

![](guide/assets/Screenshot_2023-01-05_13-12-28.png)

Nice! You have created a new wallet and a new account address has been added to it.

That was tough, now you can continue with the next steps.

### Switching to test network and grabbing tokens :ticket:

Now that you have a wallet and an account, go to the [main page of the DApp](https://unscatty.github.io/avax_gods/)

You will be prompted to connect your wallet to this the site. Click ***Approve***

![](guide/assets/Screenshot_2023-01-05_13-28-56.png)

Once you have connected your wallet, you are prompted with this screen

![](guide/assets/switch_screen.png)

Don't panic. The contract for this DApp is deployed over the Avalanche Test network (C-chain). For you to be able to interact with it, you must be on the same network.
But hey, don't worry, just click on ***Switch*** and the network will be added to Core for you.

When you click on ***Switch*** you will be asked for permissions to switch to the *Fuji C-Chain* network. Click on ***Approve***

![](guide/assets/Screenshot_2023-01-05_13-51-54.png)

Now you're prompted with this screen

![](guide/assets/grab_tokens_screen.png)

What is going on? Well, to be able to interact with the network (any blockchain network), you need tokens, which are used as currency. Each network has its own currency, in the case of Avalanche they're called AVAX Tokens.

You can get **test** tokens for your account from the Avalanche Faucet, so go grab some.

Click on the button, and a new tab opens. There you need to type your account address, or you can connect to it using the ***Connect*** button. Also make sure the network is set to *Fuji C-Chain* and token is set to AVAX

![](guide/assets/faucet_avalanche.png)

Click on ***Request 2 AVAX***. You should see a message that transaction was successful.

Now you should see those tokens in your account balance now.

**Remember these tokens are not real. They're only usable in the Avalanche Test network and nowhere else. They're not real money**

![](guide/assets/Screenshot_2023-01-05_21-24-15.png)

Go back to the page, the not enough tokens message should be gone, try reloading the page if not.

Your screen should now look like this.

![](guide/assets/rootpage.png)

### Registration

To be able to create and join battles, you need to register first. In the main page, enter a name in the text field, the click on ***Register***. You should be prompted with a request to execute a transaction. Click on ***Approve***

![](guide/assets/Screenshot_2023-01-05_21-44-13.png)

After the transaction get confirmed, you are taken to the **Create Battle page**. Your player name should be displayed instead of your account address.

![](guide/assets/create_battle_page.png)

### Create a battle :axe:

On the **Create Battle page** you can create new battles (dah) to battle other players.

To create a battle, give it a name and then click on ***Create battle*** and approve the transaction. You get this screen.

![](guide/assets/waiting_battle.png)

While you wait for other player to join the battle, you can choose between 4 different battlegrounds by clicking the ***Choose Battleground*** button.

![](guide/assets/battleground.png)

### Join a battle

To join a battle you can go to the [**Join Battle page**](https://unscatty.github.io/avax_gods/join-battle), where you should see the battle we created in [Create a battle](#create-a-battle-axe).
Click on ***Join*** and approve the transaction. Here I'm using a different account to simulate a second player joining a battle.

![](guide/assets/join_battle.png)

Once the transaction is confirmed, both players will be redirected to the battle stage, here's where the action happens.

![](guide/assets/battle_main.png)

### Battling another player

Now it is time for the real action.

To fight another player, you can perform two actions. **Attack** (the crossed swords button) or **Defend** (the shield button). Both player start with 25 health points.
The game is played by rounds. One round ends once every player has made a move. When a round is over, the status of the battle (players HP, mana, etc) gets updated.

You can always read the game rules by clicking in the info button (the "i" on the right) during a battle.

![](guide/assets/battle_rules.png)

To perform an attack move, click on the attack button, when a confirmation prompt is shown, approve the transaction. Defense move is pretty much the same.

You have to wait for your opponent to make their move before you can make another move.

To exit a battle, click on the info button, then click on ***Exit Battle*** and approve the transaction. You will need to confirm the action. Be aware that you will automatically lose the battle if you exit.

![](guide/assets/exit_battle_confirm.png)

The battle ends when one of the players loses all his HP.

![](guide/assets/won_battle.png)


Well, that's pretty much it. Have fun.

## Acknowledgments and tools used

- JSMastery, for their outstanding [tutorial on this game]() and the awesome content they make
- Vitesse, the starter template I used to scaffold this project
- Pinia, awesome store management library for Vue
- Vite, awesome build tool that makes frontend development a breeze


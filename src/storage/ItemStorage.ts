import { CardType } from '@/components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ITEMS_STORAGE_KEY = "@titulos"

export type ItemsStorage = CardType


//busca de valores salvos
async function get(): Promise<ItemsStorage[]> {
    try {
        //leitura de dados
        const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY)

        //se existir retorna string, se não retorna array vazio
        return storage ? JSON.parse(storage) : []

        //tratamento erro
    } catch (error) {
        throw new Error('ITEM_GET: ' + error)
    }
}

//busca dados pelo id
async function getById(id: string): Promise<ItemsStorage[]> {
    try {
        const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY)
        const res = (storage ? JSON.parse(storage) : []) as ItemsStorage[]

        //filtra por ID específico
        const filtered = res.filter((ref) => ref.id === id);
        return filtered;

        //tratamento erro
    } catch (error) {
        throw new Error("ITEMS_GET: " + error)
    }
}

//salva dados
async function save(items: ItemsStorage[]): Promise<void> {
    try {
        //converte array pra string e salva localmente
        await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items))

        //tratamento erro
    } catch (error) {
        throw new Error("ITEMS_SAVE: " + error)
    }
}

//add novo item
async function add(newItem: ItemsStorage): Promise<ItemsStorage[]> {
    //busca itens atuais
    const items = await get()
    //add novo item (... usado pra não modificar o original)
    const updatedItems = [...items, newItem]
    //salva tudo
    await save(updatedItems)
    return updatedItems
}

//remove item
async function remove(oldItem: ItemsStorage): Promise<ItemsStorage[]> {
    //busca itens atuais
    const items = await get();
    //remove pelo id
    const updatedItems = items.filter(item => item.id !== oldItem.id);
    //salva tudo
    await save(updatedItems);

    return updatedItems;
}

// async function removeAll(): Promise<ItemsStorage[]> {
//     const items = await get();

//     const updatedItems = items.filter(item => false);
//     await save(updatedItems);

//     return updatedItems;
// }

//atualiza itens
async function update(itemUpdated: ItemsStorage): Promise<ItemsStorage[]> {
    //busca itens atuais
    const items = await get();

    //atualiza com map, se o id bater substitui pelo novo, senão mantém o original
    const updatedItems = items.map(item => {
        if (item.id === itemUpdated.id) {
            return itemUpdated;
        }
        return item;
    }) as ItemsStorage[];
    await save(updatedItems);

    return updatedItems;
}

//exporta as funções
export const itemsStorage = {
    get,
    getById,
    add,
    update,
    remove,
}

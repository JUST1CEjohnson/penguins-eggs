/**
 * Partitions
 */
import React from 'react'
import { render, Text, Box, Newline } from 'ink'
import Title from './elements/title'
import Steps from './elements/steps'

import yaml from 'js-yaml'
import fs from 'fs'
import { ISettings, IBranding, IPartitions } from '../interfaces'

type partitionsProps = {
    installationDevice?: string,
    filesystemType?: string,
    userSwapChoice?: string
}


export default function Partitions({ installationDevice, filesystemType, userSwapChoice }: partitionsProps) {
    let installer = 'krill'
    let productName = 'unknown'
    let version = 'x.x.x'
    if (fs.existsSync('/etc/calamares/settings.conf')) {
      installer = 'calamares'
    }
    const settings = yaml.load(fs.readFileSync('/etc/' + installer + '/settings.conf', 'utf-8')) as unknown as ISettings
    const branding = settings.branding
    const calamares = yaml.load(fs.readFileSync('/etc/' + installer + '/branding/' + branding + '/branding.desc', 'utf-8')) as unknown as IBranding
    productName = calamares.strings.productName
    version = calamares.strings.version
  
     /**
     * totale width=74
     * step width=15
     * finestra with=59
     */
    
    let partitions = {} as IPartitions
    if (fs.existsSync('/etc/' + installer + '/modules/partition.conf')){
        partitions = yaml.load(fs.readFileSync('/etc/' + installer + '/modules/partition.conf', 'utf-8')) as unknown as IPartitions
    } else {
        partitions.initialSwapChoice='small'
    }
    
    return (
        <>
            <Title title={productName} />
            <Box width={74} height={11} borderStyle="round" flexDirection="column">

                <Box flexDirection="column">
                    <Box flexDirection="row">
                        <Steps step={4} />
                        <Box flexDirection="column">
                        </Box>
                        <Box flexDirection="column">
                            <Box flexDirection="row">
                                <Text underline={true}>erase disk:</Text><Text> this will </Text><Text color="red">delete </Text><Text>all data currently</Text>
                            </Box>
                            <Box><Text>present on the selected storage device</Text></Box>
                            <Newline />
                            <Box><Text>Installation device: </Text><Text color="cyan">{installationDevice}</Text></Box>
                            <Box><Text>Filesystem: </Text><Text color="cyan">{filesystemType}</Text></Box>
                            <Box><Text>User swap choice: : </Text><Text color="cyan">{userSwapChoice}</Text></Box>
                        </Box>
                    </Box>
                </Box>
            </Box >
        </>
    )
}

